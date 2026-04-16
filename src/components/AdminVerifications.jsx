import React from 'react';
import { FileText, CheckCircle, XCircle, Search, Eye } from 'lucide-react';

const AdminVerifications = ({ requests = [], onAction }) => {

    return (
        <div className="dashboard-container fade-in">
            <div className="header-section">
                <h1>Document Verifications</h1>
                <p>Review and verify pending property document requests based on proofs</p>
            </div>

            <div className="recent-activity glass-panel" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3>Pending Requests</h3>
                    <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Search size={18} style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }} />
                        <input type="text" placeholder="Search Request..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none' }} />
                    </div>
                </div>

                <div className="activity-list">
                    {requests.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)' }}>No pending verification requests.</p>
                    ) : (
                        requests.map((req) => (
                            <div key={req.id} className="activity-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div className="activity-icon" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h4 style={{ margin: 0 }}>{req.id} - {req.type}</h4>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                {req.applicant} • Property: {req.propertyId} • Submitted: {new Date(req.submissionDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`status-badge ${req.status.toLowerCase()}`}>
                                        {req.status}
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', width: '100%', marginBottom: '1rem' }}>
                                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: 'bold' }}>Attached Proofs:</p>
                                    <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        {req.proofs.map((proof, i) => (
                                            <li key={i} style={{ marginBottom: '0.25rem' }}>
                                                {proof} <a href="#" style={{ color: 'var(--primary)', marginLeft: '0.5rem', fontSize: '0.8rem' }}><Eye size={12} style={{ display: 'inline' }} /> View</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {req.status === 'Pending' && (
                                    <div style={{ display: 'flex', gap: '1rem', alignSelf: 'flex-end' }}>
                                        <button 
                                            onClick={() => onAction && onAction(req.id, 'reject')}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                            <XCircle size={16} /> Reject
                                        </button>
                                        <button 
                                            onClick={() => onAction && onAction(req.id, 'approve')}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                        >
                                            <CheckCircle size={16} /> Approve
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminVerifications;
