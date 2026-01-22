import React from 'react';
import { Calendar, Users, DollarSign, Clock, FileText, ChevronRight, Video } from 'lucide-react';

const CoachingDemo = () => {
    return (
        <div style={{ height: '100%', background: '#f3f4f6', color: '#1f2937', display: 'flex' }}>
            {/* Sidebar */}
            <div style={{ width: '220px', background: '#111827', color: '#fff', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }} className="desktop-only">
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '1px' }}>COACH.OS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#fff', fontWeight: '500' }}><Calendar size={18} /> Schedule</div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#9ca3af' }}><Users size={18} /> Clients</div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#9ca3af' }}><FileText size={18} /> Invoices</div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: '#9ca3af' }}><Video size={18} /> Sessions</div>
                </div>
            </div>

            {/* Main */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0 }}>Today's Schedule</h2>
                    <button style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', fontWeight: '500', cursor: 'pointer' }}>+ New Booking</button>
                </div>

                {/* Upcoming Session Card */}
                <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '2rem', borderLeft: '4px solid #2563eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                         <div>
                             <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2563eb', marginBottom: '0.3rem' }}>Up Next: Strategy Call</div>
                             <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>with Michael Scott • 2:00 PM - 3:00 PM</div>
                         </div>
                         <button style={{ background: '#dbeafe', color: '#2563eb', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                             <Video size={16} /> Join Meeting
                         </button>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ background: '#f3f4f6', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem' }}>Pre-read: Q3 Report</div>
                        <div style={{ background: '#f3f4f6', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem' }}>Status: Paid</div>
                    </div>
                </div>

                {/* Calendar Grid View (Simulated) */}
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Weekly Overview</h3>
                <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr)', gap: '1rem' }}>
                        {/* Time Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '3rem', color: '#9ca3af', fontSize: '0.85rem', textAlign: 'right', paddingRight: '1rem' }}>
                            <div>9 AM</div>
                            <div>10 AM</div>
                            <div>11 AM</div>
                            <div>12 PM</div>
                            <div>1 PM</div>
                        </div>

                        {/* Days */}
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                            <div key={day} style={{ position: 'relative' }}>
                                <div style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: '600', color: '#4b5563' }}>{day}</div>
                                <div style={{ height: '300px', borderLeft: '1px solid #f3f4f6', position: 'relative' }}>
                                    {[1, 4].includes(i) && (
                                        <div style={{ position: 'absolute', top: '10px', left: '4px', right: '4px', height: '80px', background: '#d1fae5', borderRadius: '6px', padding: '6px', fontSize: '0.8rem', color: '#065f46', borderLeft: '3px solid #059669' }}>
                                            <strong>Client Onboarding</strong><br/>9:00 - 10:30
                                        </div>
                                    )}
                                     {i === 2 && (
                                        <div style={{ position: 'absolute', top: '150px', left: '4px', right: '4px', height: '60px', background: '#e0e7ff', borderRadius: '6px', padding: '6px', fontSize: '0.8rem', color: '#3730a3', borderLeft: '3px solid #4f46e5' }}>
                                            <strong>Deep Work</strong><br/>12:00 - 1:00
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachingDemo;
