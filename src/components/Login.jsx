import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, User, Lock, UserCog } from 'lucide-react';

const Login = ({ onLogin, onRegisterClick, onForgotPasswordClick }) => {
    const [citizenId, setCitizenId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [loginType, setLoginType] = useState('citizen'); // 'citizen' or 'admin'

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API call and validate specific IDs
        setTimeout(() => {
            if (loginType === 'admin') {
                if (citizenId.toLowerCase() === 'admin' && password === 'admin') {
                    onLogin(true, 'admin'); // isAdmin = true, userId = 'admin'
                } else {
                    setError('Invalid Admin ID or Password. Try admin/admin');
                    setIsLoading(false);
                }
            } else {
                if (citizenId.toLowerCase() === 'user' && password === 'user') {
                    onLogin(false, 'user'); // isAdmin = false, userId = 'user'
                } else {
                    setError('Invalid User ID or Password. Try user/user');
                    setIsLoading(false);
                }
            }
        }, 800);
    };

    return (
        <div className="login-container fade-in">
            <div className="login-card glass-panel">
                <div className="login-header">
                    <div className="login-logo">
                        <ShieldCheck size={48} color="var(--primary)" />
                    </div>
                    <h1>LandSecure</h1>
                    <p>{loginType === 'admin' ? 'Admin Portal' : 'Citizen Portal'}</p>
                </div>

                <div className="login-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <button 
                        onClick={() => setLoginType('citizen')}
                        style={{ flex: 1, padding: '0.75rem', background: 'none', border: 'none', borderBottom: loginType === 'citizen' ? '2px solid var(--primary)' : '2px solid transparent', color: loginType === 'citizen' ? 'var(--primary)' : 'inherit', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        <User size={16} style={{ display: 'inline', marginRight: '5px' }} /> Citizen
                    </button>
                    <button 
                        onClick={() => setLoginType('admin')}
                        style={{ flex: 1, padding: '0.75rem', background: 'none', border: 'none', borderBottom: loginType === 'admin' ? '2px solid var(--primary)' : '2px solid transparent', color: loginType === 'admin' ? 'var(--primary)' : 'inherit', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        <UserCog size={16} style={{ display: 'inline', marginRight: '5px' }} /> Admin
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>{loginType === 'admin' ? 'Admin ID / Username' : 'Citizen ID / Username'}</label>
                        <div className="input-with-icon">
                            <User size={20} className="input-icon" />
                            <input
                                type="text"
                                placeholder={loginType === 'admin' ? "Ex: ADM-001" : "Ex: DL-2024-8839"}
                                value={citizenId}
                                onChange={(e) => setCitizenId(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                            <Lock size={20} className="input-icon" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); onForgotPasswordClick(); }}
                                style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="glass-button login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            'Authenticating...'
                        ) : (
                            <>
                                <span>{loginType === 'admin' ? 'Admin Secure Login' : 'Secure Login'}</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    {loginType === 'citizen' && (
                        <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onRegisterClick(); }}>Register here</a></p>
                    )}
                    <p className="secured-badge">
                        <ShieldCheck size={14} /> Official Government Portal
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
