import React from 'react';
import { LayoutDashboard, FileText, Search, Settings, ShieldCheck, LogOut, Flag, CheckSquare, Inbox } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, isAdmin }) => {
    const citizenMenuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'documents', icon: FileText, label: 'My Records' },
        { id: 'search', icon: Search, label: 'Public Search' },
        { id: 'report', icon: Flag, label: 'Report' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    const adminMenuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'complaints', icon: Inbox, label: 'Complaints' },
        { id: 'verifications', icon: CheckSquare, label: 'Verifications' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    const menuItems = isAdmin ? adminMenuItems : citizenMenuItems;

    return (
        <div className="sidebar glass-panel">
            <div className="logo-section">
                <div className="logo-icon">
                    <ShieldCheck size={28} color="var(--primary)" />
                </div>
                <div className="logo-text">
                    <h2>LandSecure</h2>
                    <span>{isAdmin ? 'Admin Portal' : 'Digital Records Portal'}</span>
                </div>
            </div>

            <nav className="nav-menu">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="user-profile">
                <div className="user-avatar">{isAdmin ? 'AD' : 'RK'}</div>
                <div className="user-info">
                    <h4>{isAdmin ? 'System Admin' : 'Rajesh'}</h4>
                    <span>{isAdmin ? 'Authority' : 'Citizen'}</span>
                </div>
                <button className="logout-btn" onClick={onLogout} title="Logout">
                    <LogOut size={18} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
