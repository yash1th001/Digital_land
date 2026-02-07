import React from 'react';
import { LayoutDashboard, FileText, Search, Settings, ShieldCheck, LogOut, Flag } from 'lucide-react';


const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'documents', icon: FileText, label: 'My Records' },
        { id: 'search', icon: Search, label: 'Public Search' },
        { id: 'report', icon: Flag, label: 'Report' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];


    return (
        <div className="sidebar glass-panel">
            <div className="logo-section">
                <div className="logo-icon">
                    <ShieldCheck size={28} color="var(--primary)" />
                </div>
                <div className="logo-text">
                    <h2>LandSecure</h2>
                    <span>Digital Records Portal</span>
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
                <div className="user-avatar">RK</div>
                <div className="user-info">
                    <h4>Rajesh</h4>
                    <span>Citizen</span>
                </div>
                <button className="logout-btn" onClick={onLogout} title="Logout">
                    <LogOut size={18} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
