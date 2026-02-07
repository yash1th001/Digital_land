import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, User, Lock } from 'lucide-react';

const Login = ({ onLogin, onRegisterClick, onForgotPasswordClick }) => {
    const [citizenId, setCitizenId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (citizenId && password) {
                onLogin();
            } else {
                setError('Please enter both Citizen ID and Password');
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="login-container fade-in">
            <div className="login-card glass-panel">
                <div className="login-header">
                    <div className="login-logo">
                        <ShieldCheck size={48} color="var(--primary)" />
                    </div>
                    <h1>LandSecure</h1>
                    <p>Citizen/Department Login Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Citizen ID / Username</label>
                        <div className="input-with-icon">
                            <User size={20} className="input-icon" />
                            <input
                                type="text"
                                placeholder="Ex: DL-2024-8839"
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
                                <span>Secure Login</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onRegisterClick(); }}>Register here</a></p>
                    <p className="secured-badge">
                        <ShieldCheck size={14} /> Official Government Portal
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
