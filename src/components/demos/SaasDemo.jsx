import React from 'react';
import { Terminal, Database, Shield, Zap, Key } from 'lucide-react';

const SaasDemo = () => {
    return (
        <div style={{ height: '100%', background: '#0d1117', color: '#c9d1d9', display: 'flex', fontFamily: 'monospace' }}>
            {/* Sidebar */}
            <div style={{ width: '200px', borderRight: '1px solid #30363d', padding: '1.5rem 1rem' }} className="desktop-only">
                <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={20} color="#2ea043" /> STARTUP_KIT
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '0.5rem', background: '#21262d', borderRadius: '6px', color: '#fff' }}>Dashboard</div>
                    <div style={{ padding: '0.5rem', cursor: 'pointer' }}>API Keys</div>
                    <div style={{ padding: '0.5rem', cursor: 'pointer' }}>Users</div>
                    <div style={{ padding: '0.5rem', cursor: 'pointer' }}>Webhooks</div>
                    <div style={{ padding: '0.5rem', cursor: 'pointer' }}>Billing</div>
                </div>
            </div>

            {/* Main */}
            <div style={{ flex: 1, padding: '2rem' }}>
                <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '2rem' }}>API Overview</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ background: '#161b22', border: '1px solid #30363d', padding: '1rem', borderRadius: '6px' }}>
                        <div style={{ color: '#8b949e', fontSize: '0.85rem' }}>Total Requests</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginTop: '0.5rem' }}>1.2M</div>
                    </div>
                    <div style={{ background: '#161b22', border: '1px solid #30363d', padding: '1rem', borderRadius: '6px' }}>
                        <div style={{ color: '#8b949e', fontSize: '0.85rem' }}>Latency (p95)</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#58a6ff', marginTop: '0.5rem' }}>24ms</div>
                    </div>
                    <div style={{ background: '#161b22', border: '1px solid #30363d', padding: '1rem', borderRadius: '6px' }}>
                        <div style={{ color: '#8b949e', fontSize: '0.85rem' }}>Error Rate</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ea043', marginTop: '0.5rem' }}>0.01%</div>
                    </div>
                </div>

                <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <span style={{ fontWeight: '600' }}>Active Tokens</span>
                         <button style={{ background: '#238636', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer' }}>+ Generate New Key</button>
                    </div>
                    <div style={{ padding: '1rem' }}>
                        {[
                            { name: 'Prod Server 1', key: 'sk_live_...942s', created: '2d ago', status: 'Active' },
                            { name: 'Dev Local', key: 'sk_test_...882x', created: '5d ago', status: 'Active' },
                            { name: 'Staging', key: 'sk_test_...112p', created: '1mo ago', status: 'Revoked' }
                        ].map((row, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: i < 2 ? '1px solid #30363d' : 'none', color: row.status === 'Revoked' ? '#8b949e' : '#c9d1d9' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <Key size={16} />
                                    <span>{row.name}</span>
                                </div>
                                <code style={{ background: 'rgba(110,118,129,0.4)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>{row.key}</code>
                                <div style={{ width: '80px', textAlign: 'right', color: row.status === 'Active' ? '#2ea043' : '#8b949e' }}>{row.status}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaasDemo;
