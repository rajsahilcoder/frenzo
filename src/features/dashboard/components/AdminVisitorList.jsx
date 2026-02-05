import React, { useState, useEffect } from 'react';
import { analyticsService } from '../../analytics/analyticsService';

const AdminVisitorList = ({ onSelectVisitor }) => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadVisitors = async () => {
            try {
                // 1. Fetch raw visitor list (unique Device IDs)
                const rawVisitors = await analyticsService.getAllVisitors();
                
                // 2. Enrich with User Profile Data (if userId exists)
                const enrichedVisitors = await analyticsService.enrichWithUserData(rawVisitors);
                
                setVisitors(enrichedVisitors);
            } catch (error) {
                console.error("Error loading visitor list:", error);
            } finally {
                setLoading(false);
            }
        };
        loadVisitors();
    }, []);

    const timeAgo = (timestamp) => {
        if (!timestamp) return 'Never';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const diff = (new Date() - date) / 1000;
        
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    if (loading) return <p>Loading visitors...</p>;

    return (
        <div className="analytics-list-container">
            <h3>Visitor Insights ({visitors.length})</h3>
            <div style={{ overflowX: 'auto' }}>
                <table className="analytics-table">
                    <thead>
                        <tr>
                            <th>User / Device</th>
                            <th>Total Visits</th>
                            <th>Last Active</th>
                            <th>First Seen</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.map((v) => (
                            <tr key={v.deviceId} onClick={() => onSelectVisitor(v)} style={{ cursor: 'pointer' }}>
                                <td>
                                    {v.userData ? (
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <span style={{fontWeight:'600', color:'var(--text-primary)'}}>
                                                {v.userData.displayName || 'Unnamed User'}
                                            </span>
                                            <span style={{fontSize:'0.8rem', color:'var(--text-tertiary)'}}>
                                                {v.userData.email}
                                            </span>
                                        </div>
                                    ) : (
                                        <span style={{fontFamily:'monospace', color:'var(--text-secondary)'}}>
                                            Guest ({v.deviceId.substring(0, 8)}...)
                                        </span>
                                    )}
                                </td>
                                <td>{v.visitCount}</td>
                                <td style={{ color: 'var(--accent-primary)' }}>{timeAgo(v.lastSeen)}</td>
                                <td>{timeAgo(v.firstSeen)}</td>
                                <td>
                                    <button 
                                        style={{ 
                                            background: 'var(--bg-tertiary)', border:'1px solid var(--border-light)', 
                                            color:'var(--text-primary)', padding:'0.4rem 0.8rem', borderRadius:'4px', cursor:'pointer'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectVisitor(v);
                                        }}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminVisitorList;
