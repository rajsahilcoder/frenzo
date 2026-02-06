import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isAdmin } from '../config/admins';
import UserProfile from '../features/dashboard/components/UserProfile';

const UserProfilePage = () => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    
    // Check permissions
    const isOwner = currentUser?.uid === userId;
    const isAdministrator = isAdmin(currentUser?.email);
    
    // If not owner AND not admin, deny access
    if (!isOwner && !isAdministrator) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Access Denied</h2>
                <p>You do not have permission to view this profile.</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="user-welcome">
                    <button onClick={() => window.history.back()} style={{background:'none', border:'none', cursor:'pointer', marginBottom:'1rem', padding:'0', color:'var(--text-secondary)'}}>
                        &larr; Back
                    </button>
                    <h1>User Profile</h1>
                    <p className="user-email">ID: {userId}</p>
                </div>
            </div>
            
            <div className="dashboard-grid single-column">
                <UserProfile 
                    targetUserId={userId} 
                    readOnly={!isOwner} // Admins get read-only by default as requested "see" not "edit"
                />
            </div>
        </div>
    );
};

export default UserProfilePage;
