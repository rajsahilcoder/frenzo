import React, { useState } from 'react';
import { Save, Lock, Unlock, Edit2 } from 'lucide-react';
import { projectService } from '../api/projectService';
import { PROJECT_ROLES } from '../constants';

const ProjectOverview = ({ project, role }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    description: project.requirements || '',
    clientNotes: project.clientNotes || '',
    adminNotes: project.adminNotes || '',
    estimatedCost: project.estimatedCost || 0,
    title: project.title || ''
  });
  const [loading, setLoading] = useState(false);

  const isAdmin = role === PROJECT_ROLES.ADMIN;
  const isLocked = project.isLocked;

  const handleSave = async () => {
    setLoading(true);
    try {
      await projectService.updateProject(project.id, {
        requirements: formData.description,
        clientNotes: formData.clientNotes,
        adminNotes: formData.adminNotes, // Only if admin
        estimatedCost: Number(formData.estimatedCost), // Only if admin
        title: formData.title // Only if admin
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update project", error);
      alert("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const toggleLock = async () => {
    if (!isAdmin) return;
    try {
      await projectService.updateProject(project.id, { isLocked: !isLocked });
    } catch (error) {
      console.error("Failed to toggle lock", error);
    }
  };

  // Client can only edit requirements if NOT locked
  const canEdit = isAdmin || (!isLocked);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
         <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Project Overview</h3>
         <div style={{ display: 'flex', gap: '10px' }}>
            {isAdmin && (
              <button 
                onClick={toggleLock}
                title={isLocked ? "Unlock Requirements" : "Lock Requirements"}
                style={{ 
                  background: 'transparent', border: '1px solid #333', color: isLocked ? '#ef4444' : '#22c55e', 
                  padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                <span style={{ fontSize: '0.8rem' }}>{isLocked ? 'Locked' : 'Unlocked'}</span>
              </button>
            )}
            
            {canEdit && !isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                style={{ 
                  background: 'var(--accent-primary)', border: 'none', color: '#fff', 
                  padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Edit2 size={16} /> Edit
              </button>
            )}
            
            {isEditing && (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  style={{ background: 'transparent', border: '1px solid #333', color: '#888', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={loading}
                  style={{ 
                    background: '#10b981', border: 'none', color: '#fff', 
                    padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <Save size={16} /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            )}
         </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
         {/* Left Column: Requirements */}
         <div style={{ flex: '1 1 600px', background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '0.9rem', marginBottom: '10px' }}>
              Project Requirements & Scope
            </label>
            {isEditing ? (
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                style={{ 
                  width: '100%', minHeight: '300px', background: '#050505', border: '1px solid #333', 
                  color: '#ddd', padding: '1rem', borderRadius: '8px', lineHeight: '1.6', fontFamily: 'inherit'
                }}
              />
            ) : (
              <div style={{ whiteSpace: 'pre-wrap', color: '#ccc', lineHeight: '1.6' }}>
                {project.requirements || "No requirements documented yet."}
              </div>
            )}
         </div>

         {/* Right Column: Meta & Notes */}
         <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Cost Card */}
            <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
               <label style={{ display: 'block', color: '#888', fontSize: '0.9rem', marginBottom: '10px' }}>Estimated Cost</label>
               {isAdmin && isEditing ? (
                 <input 
                   type="number"
                   value={formData.estimatedCost}
                   onChange={(e) => setFormData({...formData, estimatedCost: e.target.value})}
                   style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                 />
               ) : (
                 <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                   ₹{Number(project.estimatedCost).toLocaleString()}
                 </div>
               )}
            </div>

            {/* Public Notes */}
            <div style={{ background: '#111', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
               <label style={{ display: 'block', color: '#888', fontSize: '0.9rem', marginBottom: '10px' }}>Project Notes (Visible to Client)</label>
               {isAdmin && isEditing ? (
                 <textarea 
                   rows={4}
                   value={formData.clientNotes}
                   onChange={(e) => setFormData({...formData, clientNotes: e.target.value})}
                   style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                 />
               ) : (
                 <p style={{ color: '#aaa', fontSize: '0.95rem' }}>{project.clientNotes || "No notes."}</p>
               )}
            </div>

            {/* Admin Internal Notes - STRICTLY ADMIN ONLY */}
            {isAdmin && (
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <label style={{ display: 'block', color: '#ef4444', fontSize: '0.9rem', marginBottom: '10px', fontWeight: 'bold' }}>Internal Admin Notes (Private)</label>
                {isEditing ? (
                 <textarea 
                   rows={4}
                   value={formData.adminNotes}
                   onChange={(e) => setFormData({...formData, adminNotes: e.target.value})}
                   style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                 />
               ) : (
                 <p style={{ color: '#aaa', fontSize: '0.95rem' }}>{project.adminNotes || "No internal notes."}</p>
               )}
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
