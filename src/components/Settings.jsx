import React, { useState } from 'react';
import { User, Lock, Bell, Shield, Smartphone, Mail, Save, Check } from 'lucide-react';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [profile, setProfile] = useState({
        name: 'Rishabh Kumar',
        email: 'rishabh.kumar@example.com',
        phone: '+91 98765 43210'
    });

    const [notifications, setNotifications] = useState({
        emailUpdates: true,
        smsAlerts: true,
        promotional: false
    });

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API save
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1000);
    };

    const Toggle = ({ enabled, onChange }) => (
        <div
            onClick={() => onChange(!enabled)}
            style={{
                width: '48px',
                height: '24px',
                background: enabled ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
            }}
        >
            <div style={{
                width: '20px',
                height: '20px',
                background: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: enabled ? '26px' : '2px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
        </div>
    );

    return (
        <div className="dashboard-container fade-in">
            <div className="settings-layout">
                {/* Settings Sidebar */}
                <div className="settings-sidebar glass-panel">
                    <h3>Settings</h3>
                    <nav className="settings-nav">
                        <button
                            className={`settings-nav-item ${activeSection === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveSection('profile')}
                        >
                            <User size={18} /> Profile
                        </button>
                        <button
                            className={`settings-nav-item ${activeSection === 'security' ? 'active' : ''}`}
                            onClick={() => setActiveSection('security')}
                        >
                            <Shield size={18} /> Security
                        </button>
                        <button
                            className={`settings-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
                            onClick={() => setActiveSection('notifications')}
                        >
                            <Bell size={18} /> Notifications
                        </button>
                    </nav>
                </div>

                {/* Settings Content */}
                <div className="settings-content glass-panel">
                    <div className="content-header">
                        <h2>
                            {activeSection === 'profile' && 'Profile Management'}
                            {activeSection === 'security' && 'Security Settings'}
                            {activeSection === 'notifications' && 'Notification Preferences'}
                        </h2>
                        <button
                            className="glass-button save-btn"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                'Saving...'
                            ) : showSuccess ? (
                                <><Check size={18} /> Saved</>
                            ) : (
                                <><Save size={18} /> Save Changes</>
                            )}
                        </button>
                    </div>

                    <div className="content-body">
                        {activeSection === 'profile' && (
                            <div className="form-section fade-in">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <div className="input-with-icon">
                                        <User size={20} className="input-icon" />
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <div className="input-with-icon">
                                        <Mail size={20} className="input-icon" />
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <div className="input-with-icon">
                                        <Smartphone size={20} className="input-icon" />
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'security' && (
                            <div className="form-section fade-in">
                                <div className="security-item">
                                    <div className="item-info">
                                        <h4>Two-Factor Authentication</h4>
                                        <p>Add an extra layer of security to your account</p>
                                    </div>
                                    <Toggle enabled={true} onChange={() => { }} />
                                </div>
                                <hr className="divider" />
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <div className="input-with-icon">
                                        <Lock size={20} className="input-icon" />
                                        <input type="password" placeholder="••••••••" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <div className="input-with-icon">
                                        <Lock size={20} className="input-icon" />
                                        <input type="password" placeholder="Enter new password" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'notifications' && (
                            <div className="form-section fade-in">
                                <div className="security-item">
                                    <div className="item-info">
                                        <h4>Email Notifications</h4>
                                        <p>Receive updates about your property records</p>
                                    </div>
                                    <Toggle
                                        enabled={notifications.emailUpdates}
                                        onChange={(v) => setNotifications({ ...notifications, emailUpdates: v })}
                                    />
                                </div>
                                <hr className="divider" />
                                <div className="security-item">
                                    <div className="item-info">
                                        <h4>SMS Alerts</h4>
                                        <p>Get instant text messages for critical alerts</p>
                                    </div>
                                    <Toggle
                                        enabled={notifications.smsAlerts}
                                        onChange={(v) => setNotifications({ ...notifications, smsAlerts: v })}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .settings-layout {
                    display: grid;
                    grid-template-columns: 250px 1fr;
                    gap: 1.5rem;
                    height: 100%;
                }
                .settings-sidebar {
                    padding: 1.5rem;
                    height: fit-content;
                }
                .settings-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-top: 1.5rem;
                }
                .settings-nav-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    background: transparent;
                    border: none;
                    color: var(--text-secondary);
                    border-radius: 8px;
                    cursor: pointer;
                    text-align: left;
                    transition: all 0.2s;
                }
                .settings-nav-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                }
                .settings-nav-item.active {
                    background: var(--primary);
                    color: white;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
                .settings-content {
                    padding: 2rem;
                    min-height: 500px;
                }
                .content-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .security-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0;
                }
                .item-info h4 {
                    margin-bottom: 0.25rem;
                }
                .item-info p {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                .divider {
                    border: none;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    margin: 1rem 0;
                }
                .save-btn {
                    padding: 0.5rem 1rem;
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
            `}</style>
        </div>
    );
};

export default Settings;
