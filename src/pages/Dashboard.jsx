import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import { db } from '../lib/firebase';
import { isAdmin } from '../config/admins';
import '../features/dashboard/styles/Dashboard.css';
import AdminAnalyticsView from '../features/dashboard/components/AdminAnalyticsView'; // We will create this next

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  // Profile State
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || '');
  
  // Business State
  const [companyName, setCompanyName] = useState('');
  const [requirements, setRequirements] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const isUserAdmin = isAdmin(currentUser?.email);

  useEffect(() => {
    if (currentUser) {
        setDisplayName(currentUser.displayName || '');
        setPhoneNumber(currentUser.phoneNumber || '');
        fetchUserProfile();
    }
  }, [currentUser]);

  const fetchUserProfile = async () => {
    if (!currentUser?.uid) return;
    try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            setCompanyName(data.companyName || '');
            setRequirements(data.requirements || '');
            // If phone isn't in Auth but is in DB, use DB
            if (!currentUser.phoneNumber && data.phoneNumber) {
                setPhoneNumber(data.phoneNumber);
            }
        }
    } catch (err) {
        console.error("Error fetching user profile:", err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: '', type: '' });

    try {
        // 1. Update Auth Profile (Display Name)
        if (currentUser.displayName !== displayName) {
            await updateProfile(currentUser, { displayName });
        }

        // 2. Update Firestore Business Profile
        const userRef = doc(db, "users", currentUser.uid);
        await setDoc(userRef, {
            displayName,
            email: currentUser.email,
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

  // If Admin, show special view
  if (isUserAdmin) {
      return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="user-welcome">
                    <h1>Admin Dashboard</h1>
                    <p className="user-email">Analytics & Insights</p>
                </div>
            </div>
            <AdminAnalyticsView />
        </div>
      );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-welcome">
          <h1>Welcome, {displayName || 'User'}</h1>
          <p className="user-email">Complete your profile to help us serve you better.</p>
        </div>
      </div>

      <div className="dashboard-grid single-column">
        {/* Business Profile Form */}
        <div className="card">
            <h3>Business Profile & Requirements</h3>
            
            <form onSubmit={handleUpdateProfile} className="activity-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            className="activity-input"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your Name"
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
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Company / Organization Name (Optional)</label>
                    <input 
                        type="text" 
                        className="activity-input"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Acme Corp"
                    />
                </div>

                <div className="form-group">
                    <label>How can we help you? (Business Requirements)</label>
                    <textarea 
                        className="activity-input textarea"
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="Tell us about your project, goals, or what services you are looking for..."
                        rows={5}
                    />
                </div>

                <button type="submit" className="log-btn" disabled={loading}>
                    {loading ? 'Saving Profile...' : 'Save Profile'}
                </button>
                
                {msg.text && (
                    <p className={`profile-msg ${msg.type}`}>
                        {msg.text}
                    </p>
                )}
            </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
