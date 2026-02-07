import React from 'react';
import { FileCheck, Clock, ShieldAlert, ArrowRight } from 'lucide-react';
import { MOCK_STATS, RECENT_ACTIVITY } from '../data/mockData';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="stat-card glass-panel">
        <div className="stat-icon" style={{ backgroundColor: `hsla(${color}, 15%)`, color: `hsl(${color})` }}>
            <Icon size={24} />
        </div>
        <div className="stat-info">
            <h3>{value}</h3>
            <span>{label}</span>
        </div>
    </div>
);

const Dashboard = ({ onNavigate }) => {
    return (
        <div className="dashboard-container fade-in">
            <div className="welcome-banner glass-panel">
                <div className="banner-content">
                    <h1>Welcome back, Rajesh</h1>
                    <p>Access and manage your digital land records securely.</p>
                    <div className="action-buttons">
                        <button className="glass-button" onClick={() => onNavigate('documents')}>
                            View My Records
                        </button>
                        <button className="glass-button secondary" onClick={() => onNavigate('search')}>
                            Search Public Records
                        </button>
                    </div>
                </div>
            </div>

            <div className="stats-grid">
                <StatCard
                    icon={FileCheck}
                    label="Total Properties"
                    value={MOCK_STATS.totalProperties}
                    color="220, 70%, 50%" // Primary Blue
                />
                <StatCard
                    icon={Clock}
                    label="Pending Requests"
                    value={MOCK_STATS.pendingRequests}
                    color="35, 90%, 50%" // Orange
                />
                <StatCard
                    icon={ShieldAlert}
                    label="Verified Docs"
                    value={MOCK_STATS.verifiedDocs}
                    color="160, 80%, 45%" // Green
                />
            </div>

            <div className="activity-section glass-panel">
                <div className="section-header">
                    <h3>Recent Activity</h3>
                    <button className="text-btn">View All</button>
                </div>
                <div className="activity-list">
                    {RECENT_ACTIVITY.map((item) => (
                        <div key={item.id} className="activity-item">
                            <div className="activity-icon">
                                <Clock size={16} />
                            </div>
                            <div className="activity-details">
                                <h4>{item.action}</h4>
                                <span>{item.details}</span>
                            </div>
                            <div className="activity-time">{item.timestamp}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
