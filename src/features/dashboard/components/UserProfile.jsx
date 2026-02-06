import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { useAuth } from '../../../context/AuthContext';
import { isAdmin } from '../../../config/admins';
import { analyticsService } from '../../analytics/analyticsService';

const UserProfile = ({ targetUserId, readOnly = false }) => {
    const { currentUser } = useAuth();
    
    // Profile State
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [requirements, setRequirements] = useState('');
    const [lastLogin, setLastLogin] = useState(null);
    const [createdAt, setCreatedAt] = useState(null);
    
    // Activity State (for Admins)
    const [history, setHistory] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ text: '', type: '' });

    const isAdministrator = isAdmin(currentUser?.email);

    useEffect(() => {
        if (targetUserId) {
            fetchUserProfile(targetUserId);
            // If admin, fetch activity history
            if (isAdministrator) {
                fetchUserActivity(targetUserId);
            }
        }
    }, [targetUserId]);

    const fetchUserActivity = async (uid) => {
        try {
            const data = await analyticsService.getUserHistory(uid);
            setHistory(data);
        } catch (e) {
            console.error(e);
        }
    };

    const fetchUserProfile = async (uid) => {
        try {
            setLoading(true);
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                setDisplayName(data.displayName || '');
                setEmail(data.email || ''); 
                setPhotoURL(data.photoURL || '');
                setPhoneNumber(data.phoneNumber || '');
                setCompanyName(data.companyName || '');
                setRequirements(data.requirements || '');
                
                // If it's the current user, we can fallbacks for auth data? 
                // But generally DB should be single source of truth for "Profile Form"
                if (uid === currentUser?.uid) {
                    if (!data.displayName) setDisplayName(currentUser.displayName || '');
                    if (!data.email) setEmail(currentUser.email || '');
                    if (!data.photoURL) setPhotoURL(currentUser.photoURL || '');
                }
            } else {
                 // No DB profile yet? 
                 if (uid === currentUser?.uid) {
                     setDisplayName(currentUser.displayName || '');
                     setEmail(currentUser.email || '');
                     setPhoneNumber(currentUser.phoneNumber || '');
                     setPhotoURL(currentUser.photoURL || '');
                 } else {
                     setMsg({ text: 'User profile not found.', type: 'error' });
                 }
            }
        } catch (err) {
            console.error("Error fetching user profile:", err);
            setMsg({ text: 'Failed to load profile.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        try {
            const storageRef = ref(storage, `users/${targetUserId}/profile_${Date.now()}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setPhotoURL(url);
            
            // Auto-save the new photo URL immediately? Or wait for "Save Profile"?
            // Let's just update state, user clicks Save.
            // Actually, for UX, photo usually updates immediately. 
            // But let's stick to "Save Profile" for consistency, OR we can auto-update if we want.
            // Given the form behavior, let's keep it in state, but updating photo usually implies immediate save.
            setMsg({ text: 'Image uploaded. Click Save to apply.', type: 'success' });
        } catch (error) {
            console.error(error);
            setMsg({ text: 'Failed to upload image.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (readOnly) return;

        setLoading(true);
        setMsg({ text: '', type: '' });

        try {
            // Update Auth Profile (only if it's the current user)
            if (currentUser && currentUser.uid === targetUserId && currentUser.displayName !== displayName) {
                await updateProfile(currentUser, { displayName });
            }

            // Update Firestore
            const userRef = doc(db, "users", targetUserId);
            await setDoc(userRef, {
                displayName,
                email, // Ensure email is saved/merged
                photoURL, // Ensure photoURL is saved/merged
                phoneNumber,
                companyName,
                requirements,
                updatedAt: new Date()
            }, { merge: true });

            setMsg({ text: 'Profile updated successfully!', type: 'success' });
        } catch (error) {
            setMsg({ text: `Error: ${error.message}`, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (loading && !displayName) return <div>Loading profile...</div>;

    return (
        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ 
                        width: '64px', height: '64px', borderRadius: '50%', 
                        background: 'var(--bg-secondary)', overflow: 'hidden',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '2px solid var(--accent-primary)'
                    }}>
                        {photoURL ? (
                            <img src={photoURL} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                                {displayName ? displayName.charAt(0).toUpperCase() : '?'}
                            </span>
                        )}
                    </div>
                    {!readOnly && (
                        <>
                            <input 
                                type="file" 
                                id="profile-upload" 
                                accept="image/*" 
                                style={{ display: 'none' }} 
                                onChange={handleImageUpload}
                            />
                            <label htmlFor="profile-upload" style={{
                                position: 'absolute', bottom: '-5px', right: '-5px',
                                background: 'var(--bg-card)', border: '1px solid var(--border-light)',
                                borderRadius: '50%', width: '24px', height: '24px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-primary)'
                            }}>
                                ✎
                            </label>
                        </>
                    )}
                </div>
                <div>
                   <h3 style={{ margin: 0 }}>{readOnly ? 'User Profile Information' : 'Business Profile & Requirements'}</h3>
                   {readOnly && <p style={{margin:0, color:'var(--text-tertiary)', fontSize:'0.9rem'}}>Viewing as Admin</p>}
                </div>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="activity-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            className="activity-input"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="User Name"
                            disabled={readOnly}
                        />
                    </div>
                </div>

                <div className="form-row">
                     <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            className="activity-input"
                            value={email}
                            disabled={true} // Email usually immutable or handled via specific flow
                            style={{ opacity: 0.7, cursor: 'not-allowed' }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input 
                            type="tel" 
                            className="activity-input"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="+1 234 567 890"
                            disabled={readOnly}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Company / Organization Name</label>
                    <input 
                        type="text" 
                        className="activity-input"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company Name"
                        disabled={readOnly}
                    />
                </div>

                <div className="form-group">
                    <label>Business Requirements / Notes</label>
                    <textarea 
                        className="activity-input textarea"
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder={readOnly ? "No requirements listed." : "Tell us about your project..."}
                        rows={5}
                        disabled={readOnly}
                    />
                </div>

                {!readOnly && (
                    <button type="submit" className="log-btn" disabled={loading}>
                        {loading ? 'Saving Profile...' : 'Save Profile'}
                    </button>
                )}
                
                {msg.text && (
                    <p className={`profile-msg ${msg.type}`}>
                        {msg.text}
                    </p>
                )}
            </form>

            {/* Admin Only: Activity Timeline */}
            {isAdministrator && (
                <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>User Activity History</h3>
                    <div className="timeline">
                        {history.length === 0 && <p style={{ color: 'var(--text-tertiary)' }}>No recorded activity.</p>}
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
                                        {event.timestamp?.toDate ? event.timestamp.toDate().toLocaleString() : new Date(event.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                
                                <div style={{ fontSize: '1rem' }}>
                                    {event.type === 'page_view' && `Visited: ${event.path}`}
                                    {event.type === 'login' && `Logged in via ${event.method}`}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
