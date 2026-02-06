import { db } from '../../lib/firebase';
import { collection, addDoc, query, where, getDocs, getCountFromServer, Timestamp, doc, getDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'analytics_events';

// Helper to get or create a persistent Device ID
const getDeviceId = () => {
    let deviceId = localStorage.getItem('frenzo_device_unique_id');
    if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem('frenzo_device_unique_id', deviceId);
    }
    return deviceId;
};

export const analyticsService = {
  // 1. Log a Page View
  logPageView: async (path, userId = null) => {
    try {
        const deviceId = getDeviceId();
        await addDoc(collection(db, COLLECTION_NAME), {
            type: 'page_view',
            path: path,
            deviceId: deviceId,
            userId: userId, // Optional, links device to user
            timestamp: Timestamp.now(),
            userAgent: navigator.userAgent
        });
    } catch (error) {
        // Fail silently so we don't block the UI
        console.warn("Analytics Error:", error);
    }
  },

  // 2. Log Login Event
  logLogin: async (method, userId) => {
    try {
        const deviceId = getDeviceId();
        await addDoc(collection(db, COLLECTION_NAME), {
            type: 'login',
            method: method, // 'email', 'phone', 'google'
            deviceId: deviceId,
            userId: userId,
            timestamp: Timestamp.now()
        });
    } catch (error) {
        console.warn("Analytics Error:", error);
    }
  },

  // 3. Get Aggregated Stats (Simplified)
  getAggregatedStats: async () => {
    // ... existing logic can remain or be replaced by getAllVisitors aggregation ...
    // For now, let's keep it but also add new methods
    try {
        const q = query(collection(db, COLLECTION_NAME));
        const snapshot = await getDocs(q);
        // ... (reuse existing logic or just call getAllVisitors and aggregate?)
        // Let's implement getAllVisitors first and let the UI handle aggregation if needed, 
        // OR duplicate logic for efficiency to avoid 2 massive passes. 
        // Check implementation below.
        
        const uniqueDevices = new Set();
        const pageCounts = {};
        const authCounts = { email: 0, phone: 0, google: 0 };
        let totalPageViews = 0;

        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.deviceId) uniqueDevices.add(data.deviceId);
            if (data.type === 'page_view') {
                totalPageViews++;
                const p = data.path || '/unknown';
                pageCounts[p] = (pageCounts[p] || 0) + 1;
            }
            if (data.type === 'login' && data.method) {
                authCounts[data.method] = (authCounts[data.method] || 0) + 1;
            }
        });

        const sortedPages = Object.entries(pageCounts)
            .map(([id, count]) => ({ id, count }))
            .sort((a, b) => b.count - a.count);

        return {
            totalVisitors: uniqueDevices.size,
            totalPageViews,
            pageViews: sortedPages,
            authStats: authCounts
        };
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        return { totalVisitors:0, pageViews:[], authStats:{} };
    }
  },

  // 4. Get All Unique Visitors (User-Centric + Shared Device Handling)
  getAllVisitors: async () => {
      try {
        const q = query(collection(db, COLLECTION_NAME));
        const snapshot = await getDocs(q);
        
        const userMap = {};  // userId -> { ...stats, devices: Set }
        const guestMap = {}; // deviceId -> { ...stats }
        const deviceOwners = {}; // deviceId -> Set(userId)

        snapshot.forEach(doc => {
            const data = doc.data();
            const did = data.deviceId;
            
            // 1. Track Device Ownership
            if (data.userId && did) {
                if (!deviceOwners[did]) deviceOwners[did] = new Set();
                deviceOwners[did].add(data.userId);
            }

            // 2. Bucket Data
            if (data.userId) {
                // Known User Traffic
                if (!userMap[data.userId]) {
                    userMap[data.userId] = {
                        userId: data.userId,
                        visitCount: 0,
                        firstSeen: data.timestamp,
                        lastSeen: data.timestamp,
                        deviceIds: new Set()
                    };
                }
                const u = userMap[data.userId];
                u.visitCount++;
                if (data.timestamp < u.firstSeen) u.firstSeen = data.timestamp;
                if (data.timestamp > u.lastSeen)  u.lastSeen = data.timestamp;
                if (did) u.deviceIds.add(did);

            } else if (did) {
                // Anonymous Guest Traffic
                if (!guestMap[did]) {
                    guestMap[did] = {
                        deviceId: did,
                        visitCount: 0,
                        firstSeen: data.timestamp,
                        lastSeen: data.timestamp,
                        userId: null
                    };
                }
                const g = guestMap[did];
                g.visitCount++;
                if (data.timestamp < g.firstSeen) g.firstSeen = data.timestamp;
                if (data.timestamp > g.lastSeen)  g.lastSeen = data.timestamp;
            }
        });

        // 3. Merge "Exclusive" Guests into Users
        // If a device belongs to EXACTLY one user, we assume the guest traffic was them before login.
        // If it belongs to MULTIPLE users, we keep guest traffic separate (cannot attribute safely).
        
        const finalVisitors = [...Object.values(userMap)];
        
        Object.values(guestMap).forEach(guest => {
            const owners = deviceOwners[guest.deviceId];
            if (owners && owners.size === 1) {
                // Merge this guest into the single owner
                const ownerId = Array.from(owners)[0];
                const user = userMap[ownerId];
                if (user) {
                    user.visitCount += guest.visitCount;
                    if (guest.firstSeen < user.firstSeen) user.firstSeen = guest.firstSeen;
                    if (guest.lastSeen > user.lastSeen) user.lastSeen = guest.lastSeen;
                    // Device ID is already in user's set
                    return; // Merged, don't push to final
                }
            }
            // Else: Shared device OR purely anonymous -> Keep as Guest
            finalVisitors.push(guest);
        });

        // Format for UI
        return finalVisitors.map(v => ({
            ...v,
            // If it's a user, pick one device as 'primary' ID for table key, but allow drill-down
            deviceId: v.userId ? Array.from(v.deviceIds)[0] : v.deviceId,
            allDeviceIds: v.userId ? Array.from(v.deviceIds) : [v.deviceId]
        })).sort((a, b) => b.lastSeen - a.lastSeen);

      } catch (error) {
          console.error("Error fetching visitors:", error);
          return [];
      }
  },

  // 5. Get History for a Specific Visitor (supports multiple User Devices)
  getVisitorHistory: async (identifier, targetUserId = null) => {
      try {
          // Identifier can be a single string (deviceId) or array of strings
          const deviceIds = Array.isArray(identifier) ? identifier : [identifier];
          
          if (deviceIds.length === 0) return [];

          // Firestore 'in' query supports up to 10 items.
          const idsToQuery = deviceIds.slice(0, 10);

          const q = query(
              collection(db, COLLECTION_NAME), 
              where("deviceId", "in", idsToQuery)
          );

          const snapshot = await getDocs(q);
          const history = [];
          
          snapshot.forEach(doc => {
              const data = doc.data();
              
              // Privacy/Integration Filter:
              // 1. If viewing a User (targetUserId exists):
              //    - Include their own events.
              //    - Include Guest events (userId == null) *assuming* they might be merged.
              //    - EXCLUDE events belonging to OTHER users.
              if (targetUserId) {
                  if (data.userId && data.userId !== targetUserId) return;
              } 
              // 2. If viewing a Guest (targetUserId is null):
              //    - Include Guest events.
              //    - EXCLUDE any User events (they belong to their own rows).
              else {
                  if (data.userId) return; 
              }

              history.push({ id: doc.id, ...data });
          });
          
          return history.sort((a, b) => b.timestamp - a.timestamp); // Newest first
      } catch (error) {
          console.error("Error fetching history:", error);
          return [];
      }
  },

  // 6. Enrich with Real User Data (Name/Company)
  enrichWithUserData: async (visitors) => {
      // Collect all userIds
      const userIds = visitors.map(v => v.userId).filter(Boolean);
      const uniqueUserIds = [...new Set(userIds)]; // Javascript Set to array
      
      if (uniqueUserIds.length === 0) return visitors;

      const userMap = {};

      // Fetch users in parallel
      await Promise.all(uniqueUserIds.map(async (uid) => {
          try {
             const userRef = doc(db, "users", uid);
             const userDoc = await getDoc(userRef);
             if (userDoc.exists()) {
                 userMap[uid] = userDoc.data();
             }
          } catch (e) { 
              console.error(`Error fetching user profile for ${uid}:`, e); 
          }
      }));

      return visitors.map(v => ({
          ...v,
          userData: v.userId ? userMap[v.userId] : null
      }));
  }
};
