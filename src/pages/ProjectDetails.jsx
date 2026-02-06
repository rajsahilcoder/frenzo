import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Layout, List, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../features/projects/api/projectService';
import { PROJECT_ROLES, PROJECT_STATUS } from '../features/projects/constants';
import { isAdmin } from '../config/admins';

// Tabs
import ProjectOverview from '../features/projects/components/ProjectOverview';
import ProjectTasks from '../features/projects/components/ProjectTasks';
import ProjectDiscussion from '../features/projects/components/ProjectDiscussion';
import ProjectReview from '../features/projects/components/ProjectReview';

// Helper for status badge
const StatusBadge = ({ status }) => {
  const getColors = (s) => {
    switch (s) {
      case PROJECT_STATUS.REQUESTED: return { bg: '#fbbf24', text: '#000' };
      case PROJECT_STATUS.SCHEDULED: return { bg: '#3b82f6', text: '#fff' };
      case PROJECT_STATUS.IN_PROGRESS: return { bg: '#8b5cf6', text: '#fff' };
      case PROJECT_STATUS.COMPLETED: return { bg: '#10b981', text: '#fff' };
      case PROJECT_STATUS.CANCELLED: return { bg: '#ef4444', text: '#fff' };
      default: return { bg: '#333', text: '#888' };
    }
  };
  const { bg, text } = getColors(status);
  
  return (
    <span style={{ 
      background: bg, color: text, padding: '4px 12px', borderRadius: '20px', 
      fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' 
    }}>
      {status}
    </span>
  );
};

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState(null);

  const userRole = isAdmin(currentUser?.email) ? PROJECT_ROLES.ADMIN : PROJECT_ROLES.CLIENT;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProjectById(projectId);
        
        // Security Check: If client, ensure they own the project
        if (userRole === PROJECT_ROLES.CLIENT && data.clientId !== currentUser.uid) {
           throw new Error("Unauthorized access");
        }
        
        setProject(data);
      } catch (err) {
        console.error("Error loading project", err);
        setError("Project not found or access denied.");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
       fetchProject();
    }
  }, [projectId, currentUser, userRole]);

  if (loading) return <div className="loading-screen">Loading Project...</div>;
  if (error) return (
    <div style={{ padding: '4rem', textAlign: 'center', color: '#fff' }}>
       <h2>Error</h2>
       <p>{error}</p>
       <button onClick={() => navigate('/dashboard')} style={{ marginTop: '1rem', padding: '10px 20px', background: 'var(--accent-primary)', border: 'none', color: '#fff', borderRadius: '8px' }}>
         Back to Dashboard
       </button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#fff', paddingBottom: '4rem', paddingTop: 'var(--header-height)' }}>
      {/* Header */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '1.5rem 2rem' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#888', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.9rem' }}>
               <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
               <div>
                  <h1 style={{ fontSize: '2rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {project.title}
                    {project.isLocked && <span title="Requirements Locked" style={{ fontSize: '1.2rem' }}>🔒</span>}
                  </h1>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.9rem', color: '#888' }}>
                     {userRole === PROJECT_ROLES.ADMIN ? (
                       <select 
                         value={project.status}
                         onChange={async (e) => {
                           const newStatus = e.target.value;
                           try {
                             await projectService.updateProject(project.id, { status: newStatus });
                             setProject(prev => ({ ...prev, status: newStatus }));
                           } catch (err) {
                             console.error("Status update failed", err);
                             alert("Failed to update status");
                           }
                         }}
                         style={{ 
                           background: '#333', color: '#fff', border: 'none', 
                           padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' 
                         }}
                       >
                         {Object.values(PROJECT_STATUS).map(s => (
                           <option key={s} value={s}>{s}</option>
                         ))}
                       </select>
                     ) : (
                       <StatusBadge status={project.status} />
                     )}
                     <span>ID: {project.id.substring(0,8)}</span>
                     {userRole === PROJECT_ROLES.ADMIN && (
                        <span style={{ color: 'var(--accent-primary)' }}>Client: {project.clientName}</span>
                     )}
                  </div>
               </div>
               
               {/* Progress Bar Placeholder */}
               <div style={{ width: '200px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>
                     <span>Completion</span>
                     <span>{project.status === PROJECT_STATUS.COMPLETED ? '100%' : project.status === PROJECT_STATUS.IN_PROGRESS ? '40%' : '10%'}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#333', borderRadius: '3px', overflow: 'hidden' }}>
                     <div style={{ 
                       width: project.status === PROJECT_STATUS.COMPLETED ? '100%' : project.status === PROJECT_STATUS.IN_PROGRESS ? '40%' : '10%', 
                       height: '100%', background: 'var(--accent-primary)' 
                     }} />
                  </div>
               </div>
            </div>
         </div>
      </div>

       {/* Review Section (If Completed) */}
       {project.status === PROJECT_STATUS.COMPLETED && (
        <div style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '0 2rem' }}>
           <ProjectReview 
             project={project} 
             role={userRole} 
             onReviewSubmitted={() => setProject(prev => ({...prev, isPublic: prev.isPublic }))}
           />
        </div>
      )}

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #222', background: '#0a0a0a', position: 'sticky', top: 0, zIndex: 10 }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '2rem', padding: '0 2rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {[
              { id: 'overview', label: 'Overview', icon: <Layout size={18} /> },
              { id: 'tasks', label: 'Plan & Tasks', icon: <List size={18} /> },
              { id: 'discussion', label: 'Discussion', icon: <MessageSquare size={18} /> }
            ].map(tab => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 style={{ 
                   display: 'flex', alignItems: 'center', gap: '8px', 
                   padding: '1rem 0', background: 'transparent', border: 'none', 
                   color: activeTab === tab.id ? '#fff' : '#666',
                   borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
                   cursor: 'pointer', fontWeight: '500'
                 }}
               >
                 {tab.icon} {tab.label}
               </button>
            ))}
         </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
         {activeTab === 'overview' && <ProjectOverview project={project} role={userRole} />}
         {activeTab === 'tasks' && <ProjectTasks projectId={project.id} role={userRole} />}
         {activeTab === 'discussion' && <ProjectDiscussion projectId={project.id} currentUser={currentUser} role={userRole} />}
      </div>
    </div>
  );
};

export default ProjectDetails;
