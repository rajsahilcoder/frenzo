import { db } from '../../lib/firebase';
import { collection, addDoc, query, where, getDocs, getCountFromServer, Timestamp, doc, getDoc, setDoc, orderBy, limit, startAfter } from 'firebase/firestore';

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

const VISITOR_STATS_COLLECTION = 'visitor_stats'; // Read Model

// Helper to update visitor stats (Read Model)
const updateVisitorStats = async (deviceId, userId = null) => {
    try {
        const now = Timestamp.now();
        // Determine Doc ID: userId if known, else deviceId
        const docId = userId || deviceId;
        const ref = doc(db, VISITOR_STATS_COLLECTION, docId);
        
        // We need to read first to handle 'firstSeen' and increment correctly without atomic increment field 
        // (bucket simplified: read-modify-write is fine for low velocity, or use FieldValue.increment)
        // Let's use setDoc with merge for simplicity. For atomic count, use getDoc.
        
        const snapshot = await getDoc(ref);
        let data = snapshot.exists() ? snapshot.data() : { 
            visitCount: 0, 
            firstSeen: now, 
            deviceIds: [] // Array of strings
        };

        // Update fields
        data.visitCount = (data.visitCount || 0) + 1;
        data.lastSeen = now;
        data.userId = userId || data.userId || null; // Keep existing userId if present
        
        // Merge Device ID
        const devices = new Set(data.deviceIds || []);
        if (deviceId) devices.add(deviceId);
        data.deviceIds = Array.from(devices);

        // If we are merging a Guest -> User, we might want to carry over old stats?
        // For MVP: Just upsert the current identity's doc.
        
        await setDoc(ref, data);

    } catch (e) {
        console.warn("Stats update failed:", e);
    }
};

export const analyticsService = {
  // 1. Log a Page View
  logPageView: async (path, userId = null) => {
    try {
        const deviceId = getDeviceId();
        // 1. Write Log (Event Store)
        await addDoc(collection(db, COLLECTION_NAME), {
            type: 'page_view',
            path: path,
            deviceId: deviceId,
            userId: userId, 
            timestamp: Timestamp.now(),
            userAgent: navigator.userAgent
        });
        
        // 2. Update Stats (Read Model)
        updateVisitorStats(deviceId, userId);

    } catch (error) {
        console.warn("Analytics Error:", error);
    }
  },

  // 2. Log Login Event
  logLogin: async (method, userId) => {
    try {
        const deviceId = getDeviceId();
        await addDoc(collection(db, COLLECTION_NAME), {
            type: 'login',
            method: method, 
            deviceId: deviceId,
            userId: userId,
            timestamp: Timestamp.now()
        });

        // Update Stats
        updateVisitorStats(deviceId, userId);

    } catch (error) {
        console.warn("Analytics Error:", error);
    }
  },

  // 3. Get Aggregated Stats
  getAggregatedStats: async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME));
        const snapshot = await getDocs(q);
        
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

  // 4. Get All Unique Visitors (Paginated from Read Model)
  getAllVisitors: async (lastDoc = null, pageSize = 10) => {
      try {
        // Query visitor_stats collection
        let q = query(
            collection(db, VISITOR_STATS_COLLECTION), 
            orderBy('lastSeen', 'desc'),
            limit(pageSize)
        );

        if (lastDoc) {
            q = query(q, startAfter(lastDoc));
        }

        const snapshot = await getDocs(q);
        
        const visitors = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            visitors.push({
                ...data,
                // Ensure UI compatible fields
                deviceId: data.deviceIds?.[0] || doc.id,
                allDeviceIds: data.deviceIds || [doc.id]
            });
        });

        return {
            visitors,
            lastDoc: snapshot.docs[snapshot.docs.length - 1] || null, // Return cursor for next page
            hasMore: snapshot.docs.length === pageSize
        };

      } catch (error) {
          console.error("Error fetching visitors:", error);
          throw error;
      }
  },

  // 5. Get History for a Specific Visitor (supports multiple User Devices)
  getVisitorHistory: async (identifier, targetUserId = null) => {
      try {
          const deviceIds = Array.isArray(identifier) ? identifier : [identifier];
          if (deviceIds.length === 0) return [];

          const idsToQuery = deviceIds.slice(0, 10);
          const q = query(
              collection(db, COLLECTION_NAME), 
              where("deviceId", "in", idsToQuery)
          );

          const snapshot = await getDocs(q);
          const history = [];
          
          snapshot.forEach(doc => {
              const data = doc.data();
              if (targetUserId) {
                  if (data.userId && data.userId !== targetUserId) return;
              } else {
                  if (data.userId) return; 
              }
              history.push({ id: doc.id, ...data });
          });
          
          return history.sort((a, b) => b.timestamp - a.timestamp); 
      } catch (error) {
          console.error("Error fetching history:", error);
          return [];
      }
  },

  // 6. Enrichment
  enrichWithUserData: async (visitors) => {
      const userIds = visitors.map(v => v.userId).filter(Boolean);
      const uniqueUserIds = [...new Set(userIds)];
      
      if (uniqueUserIds.length === 0) return visitors;

      const userMap = {};
      await Promise.all(uniqueUserIds.map(async (uid) => {
          try {
             const userRef = doc(db, "users", uid);
             const userDoc = await getDoc(userRef);
             if (userDoc.exists()) userMap[uid] = userDoc.data();
          } catch (e) { console.error(e); }
      }));

      return visitors.map(v => ({
          ...v,
          userData: v.userId ? userMap[v.userId] : null
      }));
  }
};
