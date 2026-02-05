import { db } from '../../lib/firebase';
import { collection, addDoc, query, where, getDocs, getCountFromServer, Timestamp } from 'firebase/firestore';

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

  // 4. Get All Unique Visitors (with metadata)
  getAllVisitors: async () => {
      try {
        const q = query(collection(db, COLLECTION_NAME));
        const snapshot = await getDocs(q);
        
        const visitorsMap = {}; // deviceId -> { firstSeen, lastSeen, userId, totalVisits }

        snapshot.forEach(doc => {
            const data = doc.data();
            const did = data.deviceId;
            if (!did) return;

            if (!visitorsMap[did]) {
                visitorsMap[did] = {
                    deviceId: did,
                    firstSeen: data.timestamp,
                    lastSeen: data.timestamp,
                    userId: data.userId || null,
                    visitCount: 0
                };
            }

            const v = visitorsMap[did];
            v.visitCount++;
            if (data.timestamp < v.firstSeen) v.firstSeen = data.timestamp;
            if (data.timestamp > v.lastSeen)  v.lastSeen = data.timestamp;
            if (data.userId && !v.userId) v.userId = data.userId; // Capture userId if found in any event
        });

        return Object.values(visitorsMap).sort((a, b) => b.lastSeen - a.lastSeen);
      } catch (error) {
          console.error("Error fetching visitors:", error);
          return [];
      }
  },

  // 5. Get History for a Specific Visitor
  getVisitorHistory: async (deviceId) => {
      try {
          const q = query(collection(db, COLLECTION_NAME), where("deviceId", "==", deviceId));
          const snapshot = await getDocs(q);
          const history = [];
          snapshot.forEach(doc => history.push({ id: doc.id, ...doc.data() }));
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
      if (userIds.length === 0) return visitors;

      // In Firestore, we can't do "WHERE IN" for > 10 items easily, better to fetch individually or map if small scale
      // For MVP, we'll fetch individual profiles (parallelized)
      // Optimization: Create a 'users' map to avoid duplicate fetches
      const userMap = {};

      await Promise.all(userIds.map(async (uid) => {
          if (userMap[uid]) return;
          try {
             // We need to import getDoc/doc from firestore at top, assuming they are imported
             const { doc, getDoc } = await import('firebase/firestore'); 
             const userDoc = await getDoc(doc(db, "users", uid));
             if (userDoc.exists()) {
                 userMap[uid] = userDoc.data();
             }
          } catch (e) { console.error("Error fetching user detail", e); }
      }));

      return visitors.map(v => ({
          ...v,
          userData: v.userId ? userMap[v.userId] : null
      }));
  }
};
