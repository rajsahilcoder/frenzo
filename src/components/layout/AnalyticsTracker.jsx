import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '../../features/analytics/analyticsService';
import { useAuth } from '../../context/AuthContext';
import { isAdmin } from '../../config/admins';

const AnalyticsTracker = () => {
    const location = useLocation();
    const { currentUser, loading } = useAuth();
    const lastLogged = useRef({ path: '', time: 0 });

    useEffect(() => {
        // 1. Wait for Auth to Load
        if (loading) return;

        // 2. Exclude Admins
        if (currentUser && isAdmin(currentUser.email)) {
            return;
        }

        // 3. Prevent Double Logging (React StrictMode or rapid re-renders)
        const now = Date.now();
        const isSamePath = lastLogged.current.path === location.pathname;
        const isRecent = (now - lastLogged.current.time) < 1000; // 1 second threshold

        if (isSamePath && isRecent) {
            return;
        }

        // 4. Log the View
        lastLogged.current = { path: location.pathname, time: now };
        analyticsService.logPageView(location.pathname, currentUser?.uid);

    }, [location, currentUser, loading]);

    return null;
};

export default AnalyticsTracker;
