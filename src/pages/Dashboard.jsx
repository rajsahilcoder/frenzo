import React from 'react';
import { useAuth } from '../context/AuthContext';
import { isAdmin } from '../config/admins';
import '../features/dashboard/styles/Dashboard.css';
import AdminAnalyticsView from '../features/dashboard/components/AdminAnalyticsView';
import UserProfile from '../features/dashboard/components/UserProfile';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const isUserAdmin = isAdmin(currentUser?.email);

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
            <h1>Welcome, {currentUser?.displayName || 'User'}</h1>
            <p className="user-email">Complete your profile to help us serve you better.</p>
        </div>
      </div>

      <div className="dashboard-grid single-column">
        {/* Business Profile Form */}
        <UserProfile targetUserId={currentUser?.uid} readOnly={false} />
      </div>
    </div>
  );
};

export default Dashboard;
