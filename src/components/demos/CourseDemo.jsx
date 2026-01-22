import React, { useState } from 'react';
import { Play, CheckCircle, Lock, Menu, FileText, MessageSquare, Award, ChevronRight, X } from 'lucide-react';

const CourseDemo = () => {
  const [activeLesson, setActiveLesson] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // overview, notes, discussion
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([0, 1]); // IDs of completed lessons

  const modules = [
    {
      title: "Module 1: The Foundations",
      lessons: [
        { id: 0, title: 'Welcome to the Masterclass', duration: '2:15', type: 'video' },
        { id: 1, title: 'Setting Up Your Environment', duration: '14:20', type: 'video' },
        { id: 2, title: 'Understanding the Core Principles', duration: '22:45', type: 'video' },
      ]
    },
    {
      title: "Module 2: Advanced Strategy",
      lessons: [
        { id: 3, title: 'Market Research Deep Dive', duration: '18:10', type: 'video', locked: false },
        { id: 4, title: 'Building the Funnel', duration: '15:00', type: 'video', locked: true },
        { id: 5, title: 'The Launch Checklist', duration: '05:30', type: 'resource', locked: true },
      ]
    }
  ];

  const currentLessonData = modules.flatMap(m => m.lessons).find(l => l.id === activeLesson);

  const toggleComplete = (id) => {
    if (completedLessons.includes(id)) {
      setCompletedLessons(completedLessons.filter(l => l !== id));
    } else {
      setCompletedLessons([...completedLessons, id]);
    }
  };

  const progress = Math.round((completedLessons.length / 6) * 100);

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'row', position: 'relative', overflow: 'hidden', background: '#111', color: '#fff' }}>
      
      {/* Sidebar - Course Nav */}
      <div style={{ 
        width: sidebarOpen ? '320px' : '0', 
        background: '#1a1a1a', 
        borderRight: '1px solid #333', 
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        height: '100%'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #333' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ margin: 0, fontSize: '1rem' }}>SaaS Masterclass</h4>
                <div style={{ fontSize: '0.75rem', color: '#888' }}>{progress}% Complete</div>
             </div>
             <div style={{ width: '100%', height: '6px', background: '#333', borderRadius: '3px' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: '#3b82f6', borderRadius: '3px', transition: 'width 0.5s ease' }}></div>
             </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
            {modules.map((mod, i) => (
                <div key={i}>
                    <div style={{ padding: '1rem 1.5rem', background: '#222', fontSize: '0.85rem', fontWeight: '600', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {mod.title}
                    </div>
                    {mod.lessons.map((lesson) => (
                        <div 
                          key={lesson.id}
                          onClick={() => !lesson.locked && setActiveLesson(lesson.id)}
                          style={{ 
                            padding: '1rem 1.5rem', 
                            cursor: lesson.locked ? 'not-allowed' : 'pointer',
                            background: activeLesson === lesson.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                            borderLeft: activeLesson === lesson.id ? '3px solid #3b82f6' : '3px solid transparent',
                            opacity: lesson.locked ? 0.5 : 1,
                            display: 'flex',
                            gap: '0.8rem',
                            transition: 'background 0.2s'
                          }}
                        >
                            <div onClick={(e) => { e.stopPropagation(); toggleComplete(lesson.id); }}>
                                {completedLessons.includes(lesson.id) ? (
                                    <CheckCircle size={18} color="#4ade80" fill="rgba(74, 222, 128, 0.1)" />
                                ) : (
                                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #555' }}></div>
                                )}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: activeLesson === lesson.id ? '#3b82f6' : '#fff' }}>{lesson.title}</div>
                                <div style={{ fontSize: '0.75rem', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {lesson.type === 'video' ? <Play size={10} /> : <FileText size={10} />}
                                    {lesson.duration}
                                </div>
                            </div>
                            {lesson.locked && <Lock size={14} color="#444" />}
                        </div>
                    ))}
                </div>
            ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
         {/* Top Bar (Mobile) */}
         <div style={{ 
            height: '50px', 
            borderBottom: '1px solid #333', 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0 1rem',
            background: '#111'
         }}>
             <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginRight: '1rem' }}>
                 {sidebarOpen ? <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} /> : <Menu size={20} />}
             </button>
             <span style={{ fontSize: '0.9rem', color: '#aaa' }}>{currentLessonData?.title}</span>
         </div>

         {/* Video Player */}
         <div style={{ 
             flex: 1, 
             background: '#000', 
             position: 'relative', 
             display: 'flex', 
             alignItems: 'center', 
             justifyContent: 'center',
             minHeight: '300px'
         }}>
             <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                 <Play size={32} fill="#fff" color="#fff" style={{ marginLeft: '4px' }} />
             </div>
             {/* Fake Controls */}
             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                 <div style={{ display: 'flex', gap: '1rem', width: '100%', alignItems: 'center', marginBottom: '0.5rem' }}>
                     <span style={{ fontSize: '0.8rem' }}>04:20</span>
                     <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', cursor: 'pointer', position: 'relative' }}>
                         <div style={{ width: '30%', height: '100%', background: '#3b82f6', borderRadius: '2px' }}></div>
                         <div style={{ width: '12px', height: '12px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '-4px', left: '30%' }}></div>
                     </div>
                     <span style={{ fontSize: '0.8rem' }}>{currentLessonData?.duration}</span>
                 </div>
             </div>
         </div>

         {/* Bottom Tabs Area */}
         <div style={{ height: '250px', background: '#111', display: 'flex', flexDirection: 'column' }}>
             <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
                 {['overview', 'notes', 'discussion'].map(tab => (
                     <div 
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       style={{ 
                           padding: '1rem 1.5rem', 
                           cursor: 'pointer',
                           color: activeTab === tab ? '#3b82f6' : '#aaa',
                           borderBottom: activeTab === tab ? '2px solid #3b82f6' : '2px solid transparent',
                           textTransform: 'capitalize',
                           fontSize: '0.9rem',
                           fontWeight: '500'
                       }}
                     >
                         {tab}
                     </div>
                 ))}
             </div>
             
             <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
                 {activeTab === 'overview' && (
                     <div>
                         <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{currentLessonData?.title}</h2>
                         <p style={{ color: '#aaa', lineHeight: '1.6', fontSize: '0.95rem' }}>
                             In this lesson, we will cover the fundamental strategies for setting up your environment. 
                             Make sure you have downloaded the resources attached to this module.
                         </p>
                         <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <button style={{ padding: '0.8rem 1.5rem', background: '#3b82f6', color: '#fff', borderRadius: '6px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>Complete & Continue</button>
                            <button style={{ padding: '0.8rem 1.5rem', background: '#333', color: '#fff', borderRadius: '6px', border: 'none', fontWeight: '500', cursor: 'pointer' }}>Download PDF</button>
                         </div>
                     </div>
                 )}
                 {activeTab === 'notes' && (
                     <div style={{ color: '#888', fontStyle: 'italic' }}>
                         Your personal notes for this lesson will appear here...
                     </div>
                 )}
                 {activeTab === 'discussion' && (
                     <div>
                         <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                             <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#333' }}></div>
                             <div>
                                 <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Alex Chen <span style={{ fontWeight: '400', color: '#666', fontSize: '0.8rem' }}>• 2h ago</span></div>
                                 <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Does this apply to B2B models as well?</p>
                             </div>
                         </div>
                         <div style={{ display: 'flex', gap: '1rem' }}>
                             <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#3b82f6' }}></div>
                             <div>
                                 <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Instructor <span style={{ fontWeight: '400', color: '#666', fontSize: '0.8rem' }}>• 1h ago</span></div>
                                 <p style={{ color: '#ccc', fontSize: '0.9rem' }}>Yes! The principles are identical, just the outreach channel changes.</p>
                             </div>
                         </div>
                     </div>
                 )}
             </div>
         </div>
      </div>
    </div>
  );
};

export default CourseDemo;
