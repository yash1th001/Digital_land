import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, User, Lock, Mail, UserPlus } from 'lucide-react';

const Register = ({ onRegister, onLoginClick }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        citizenId: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.fullName || !formData.email || !formData.citizenId || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            // onRegister(); // authentication handled by user clicking login now
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="login-container fade-in">
                <div className="login-card glass-panel" style={{ maxWidth: '450px', textAlign: 'center' }}>
                    <div className="login-header">
                        <div className="login-logo">
                            <ShieldCheck size={48} color="var(--success, #10b981)" />
                        </div>
                        <h1>Registration Successful!</h1>
                        <p>Your citizen account has been created.</p>
                    </div>

                    <div className="success-content" style={{ margin: '2rem 0' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Please log in with your Citizen ID and password to access your land records.
                        </p>
                    </div>

                    <button
                        onClick={onLoginClick}
                        className="glass-button login-btn"
                    >
                        <span>Proceed to Login</span>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container fade-in">
            <div className="login-card glass-panel" style={{ maxWidth: '450px' }}>
                <div className="login-header">
                    <div className="login-logo">
                        <ShieldCheck size={48} color="var(--primary)" />
                    </div>
                    <h1>Join LandSecure</h1>
                    <p>Create your secure citizen account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-with-icon">
                            <User size={20} className="input-icon" />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-with-icon">
                            <Mail size={20} className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Citizen ID</label>
                        <div className="input-with-icon">
                            <ShieldCheck size={20} className="input-icon" />
                            <input
                                type="text"
                                name="citizenId"
                                placeholder="Create a Citizen ID"
                                value={formData.citizenId}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                            <Lock size={20} className="input-icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="input-with-icon">
                            <Lock size={20} className="input-icon" />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="glass-button login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            'Creating Account...'
                        ) : (
                            <>
                                <span>Create Account</span>
                                <UserPlus size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>Login here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
