import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyticsService } from '../../analytics/analyticsService';

const AdminVisitorDetail = ({ visitor, onBack }) => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
             // Support merged view (allDeviceIds) or fallback to single deviceId
            const identifier = visitor?.allDeviceIds || visitor?.deviceId;
            if (!identifier) return;
            
            try {
                const data = await analyticsService.getVisitorHistory(identifier, visitor.userId);
                setHistory(data);
            } catch (error) {
                console.error("Error loading history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [visitor]);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Runs ago';
        // Handle Firestore Timestamp or Date
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleString();
    };

    return (
        <div className="analytics-detail-container">
            <button onClick={onBack} className="back-btn" style={{ marginBottom: '1rem', cursor: 'pointer', background:'none', border:'none', color:'var(--accent-primary)' }}>
                &larr; Back to List
            </button>

            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                    <h3>Visitor Profile</h3>
                    {visitor.userId && (
                        <button 
                            onClick={() => navigate(`/profile/${visitor.userId}`)}
                            style={{
                                background: 'transparent', border:'1px solid var(--accent-primary)', 
                                color:'var(--accent-primary)', padding:'0.3rem 0.8rem', borderRadius:'4px', cursor:'pointer', fontSize:'0.85rem'
                            }}
                        >
                            View Full Profile &rarr;
                        </button>
                    )}
                </div>
                
                <div className="form-row">
                    <div>
                        <small className="label">Primary Device ID</small>
                        <p style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                            {visitor.deviceId}
                            {visitor.allDeviceIds?.length > 1 && (
                                <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-primary)' }}>
                                    (+{visitor.allDeviceIds.length - 1} linked)
                                </span>
                            )}
                        </p>
                    </div>
                    {visitor.userData && (
                        <div>
                            <small className="label">User Name</small>
                            <p className="highlight">{visitor.userData.displayName || visitor.userData.email}</p>
                        </div>
                    )}
                </div>
                {visitor.userData && (
                    <div style={{ marginTop: '1rem' }}>
                        <small className="label">Company / Phone</small>
                        <p>{visitor.userData.companyName} {visitor.userData.phoneNumber && `• ${visitor.userData.phoneNumber}`}</p>
                    </div>
                )}
            </div>

            <h3>Activity Timeline</h3>
            {loading ? <p>Loading history...</p> : (
                <div className="timeline">
                    {history.map((event) => (
                        <div key={event.id} className="timeline-item" style={{ 
                            padding: '1rem', 
                            borderLeft: '2px solid var(--border-light)', 
                            marginLeft: '0.5rem',
                            position: 'relative'
                        }}>
                             <div style={{ 
                                 position: 'absolute', left: '-6px', top: '1.2rem', 
                                 width: '10px', height: '10px', borderRadius: '50%', 
                                 background: event.type === 'login' ? 'var(--accent-primary)' : 'var(--text-tertiary)' 
                             }}></div>
                             
                            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.25rem'}}>
                                <span style={{ 
                                    textTransform:'uppercase', 
                                    fontSize:'0.75rem', 
                                    color: event.type === 'login' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                    fontWeight: '600'
                                }}>
                                    {event.type.replace('_', ' ')}
                                </span>
                                <span style={{ fontSize:'0.8rem', color:'var(--text-tertiary)' }}>
                                    {formatDate(event.timestamp)}
                                </span>
                            </div>
                            
                            <div style={{ fontSize: '1rem' }}>
                                {event.type === 'page_view' && `Visited: ${event.path}`}
                                {event.type === 'login' && `Logged in via ${event.method}`}
                            </div>
                        </div>
                    ))}
                    {history.length === 0 && <p>No history found.</p>}
                </div>
            )}
        </div>
    );
};

export default AdminVisitorDetail;
