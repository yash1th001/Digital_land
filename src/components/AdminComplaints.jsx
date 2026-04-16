import React from 'react';
import { Flag, CheckCircle, Clock } from 'lucide-react';

const AdminComplaints = ({ complaints = [], onResolve }) => {
    
    // Using the complaints prop instead of local state to sync with citizen view

    return (
        <div className="dashboard-container fade-in">
            <div className="header-section">
                <h1>Received Complaints</h1>
                <p>Manage and resolve citizen reported issues</p>
            </div>

            <div className="recent-activity glass-panel" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3>All Complaints</h3>
                </div>

                <div className="activity-list">
                    {complaints.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)' }}>No complaints found.</p>
                    ) : (
                        complaints.map((complaint) => (
                            <div key={complaint.id} className="activity-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div className="activity-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                                            <Flag size={20} />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0 }}>{complaint.id} - {complaint.name}</h4>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                {new Date(complaint.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`status-badge ${complaint.status.toLowerCase()}`}>
                                        {complaint.status === 'Resolved' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                        {complaint.status}
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', width: '100%', marginBottom: '1rem' }}>
                                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}><strong>Owner of Land:</strong> {complaint.ownerOfLand}</p>
                                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}><strong>Mobile No:</strong> {complaint.mobileNo}</p>
                                    <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}><strong>Issue:</strong> {complaint.issue}</p>
                                </div>
                                {complaint.status === 'Pending' && (
                                    <button 
                                        onClick={() => onResolve && onResolve(complaint.id)}
                                        style={{ alignSelf: 'flex-end', padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        Mark as Resolved
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminComplaints;
