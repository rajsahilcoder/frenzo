import React from 'react';
import { Bot, GitBranch, Play, Settings } from 'lucide-react';

const AiDemo = () => {
    return (
        <div style={{ height: '100%', background: '#000', color: '#fff', display: 'flex', fontFamily: 'sans-serif' }}>
            {/* Visual Workflow Canvas */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundSize: '40px 40px', backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)' }}></div>
                
                {/* Nodes (Simulated) */}
                <div style={{ position: 'absolute', top: '20%', left: '10%', width: '200px', background: '#1c1c1c', border: '1px solid #333', borderRadius: '8px', padding: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: '#a855f7' }}>
                        <Bot size={18} /> Trigger: New Email
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>from: *queries@*</div>
                </div>

                {/* Connection Line */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <path d="M 310 160 C 360 160, 360 250, 410 250" stroke="#444" strokeWidth="2" fill="none" />
                </svg>

                <div style={{ position: 'absolute', top: '40%', left: '40%', width: '220px', background: '#1c1c1c', border: '1px solid #333', borderRadius: '8px', padding: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: '#3b82f6' }}>
                        <GitBranch size={18} /> Agent: Categorize
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Model: GPT-4o</div>
                    <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#111', borderRadius: '4px', fontSize: '0.75rem', color: '#ccc' }}>
                        "Is this a support request or sales lead?"
                    </div>
                </div>

                 {/* Connection Line 2 */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <path d="M 630 280 C 680 280, 680 350, 730 350" stroke="#444" strokeWidth="2" fill="none" />
                </svg>

                <div style={{ position: 'absolute', top: '60%', left: '70%', width: '200px', background: '#1c1c1c', border: '1px solid #333', borderRadius: '8px', padding: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: '#22c55e' }}>
                        <Play size={18} /> Action: CRM Sync
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Destination: HubSpot</div>
                </div>

                {/* Controls */}
                <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '0.5rem' }}>
                    <button style={{ padding: '0.6rem 1.2rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Deploy Workflow</button>
                    <button style={{ padding: '0.6rem', background: '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><Settings size={20} /></button>
                </div>
            </div>

            {/* Logs Console */}
            <div style={{ width: '300px', background: '#111', borderLeft: '1px solid #333', padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem' }} className="desktop-only">
                <div style={{ color: '#888', marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>Live Logs</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div>
                        <span style={{ color: '#666' }}>14:23:01</span> <span style={{ color: '#a855f7' }}>[TRIGGER]</span> Email Received
                    </div>
                    <div>
                        <span style={{ color: '#666' }}>14:23:02</span> <span style={{ color: '#3b82f6' }}>[AGENT]</span> Processing tokens...
                    </div>
                    <div>
                        <span style={{ color: '#666' }}>14:23:04</span> <span style={{ color: '#22c55e' }}>[SUCCESS]</span> Labelled: "High Priority"
                    </div>
                     <div>
                        <span style={{ color: '#666' }}>14:23:05</span> <span style={{ color: '#eab308' }}>[SYNC]</span> Connected to API...
                    </div>
                    <div style={{ opacity: 0.5 }}>_</div>
                </div>
            </div>
        </div>
    );
};

export default AiDemo;
