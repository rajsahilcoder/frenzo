import React, { useState, useEffect } from 'react';
import { analyticsService } from '../../analytics/analyticsService';
import AdminVisitorList from './AdminVisitorList';
import AdminVisitorDetail from './AdminVisitorDetail';

const AdminAnalyticsView = () => {
    // View State: 'overview' | 'detail'
    const [viewMode, setViewMode] = useState('overview');
    const [selectedVisitor, setSelectedVisitor] = useState(null);

    const [stats, setStats] = useState({
        totalVisitors: 0,
        pageViews: [],
        authStats: { email: 0, phone: 0, google: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const data = await analyticsService.getAggregatedStats();
            setStats(data);
        } catch (error) {
            console.error("Error loading analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVisitorSelect = (visitor) => {
        setSelectedVisitor(visitor);
        setViewMode('detail');
    };

    const handleBack = () => {
        setViewMode('overview');
        setSelectedVisitor(null);
    };

    if (loading) return <div className="profile-msg">Loading analytics...</div>;

    // Render Logic
    if (viewMode === 'detail' && selectedVisitor) {
        return <AdminVisitorDetail visitor={selectedVisitor} onBack={handleBack} />;
    }

    // Default: Overview with Visitor List
    return (
        <div className="analytics-container">
            {/* KPI Cards */}
            <div className="analytics-grid">
                <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => console.log("Already on list view")}>
                    <h4 className="stat-label">Total Unique Visitors</h4>
                    <p className="stat-value">{stats.totalVisitors}</p>
                    <small style={{ color: 'var(--accent-primary)' }}>Scroll down for list &darr;</small>
                </div>
                <div className="stat-card">
                    <h4 className="stat-label">Total Page Views</h4>
                    <p className="stat-value">{stats.totalPageViews || 0}</p>
                </div>
                <div className="stat-card">
                    <h4 className="stat-label">Signups (Email)</h4>
                    <p className="stat-value">{stats.authStats.email}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {/* 1. Full Visitor List (Drill Down Entry Point) */}
                <AdminVisitorList onSelectVisitor={handleVisitorSelect} />

                {/* 2. Page View Breakdown */}
                <div className="analytics-list-container">
                    <h3>Most Visited Pages</h3>
                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>Page Path</th>
                                <th>Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.pageViews.map((page, index) => (
                                <tr key={index}>
                                    <td>{page.id}</td> 
                                    <td>{page.count}</td>
                                </tr>
                            ))}
                            {stats.pageViews.length === 0 && (
                                <tr><td colSpan="2" style={{textAlign:'center', color:'var(--text-tertiary)'}}>No page views recorded yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalyticsView;
