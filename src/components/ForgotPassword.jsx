import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = ({ onBackToLogin }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
        }, 1500);
    };

    if (isSent) {
        return (
            <div className="login-container fade-in">
                <div className="login-card glass-panel" style={{ maxWidth: '400px', textAlign: 'center' }}>
                    <div className="login-header">
                        <div className="login-logo">
                            <CheckCircle size={48} color="var(--success, #10b981)" />
                        </div>
                        <h1>Check your email</h1>
                        <p>We have sent a password reset link to <br /><strong>{email}</strong></p>
                    </div>

                    <div className="success-content" style={{ margin: '2rem 0' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Didn't receive the email? Check your spam folder or try again.
                        </p>
                    </div>

                    <button
                        onClick={onBackToLogin}
                        className="glass-button login-btn"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Login</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container fade-in">
            <div className="login-card glass-panel" style={{ maxWidth: '400px' }}>
                <div className="login-header">
                    <div className="login-logo">
                        <ShieldCheck size={48} color="var(--primary)" />
                    </div>
                    <h1>Reset Password</h1>
                    <p>Enter your email to receive reset instructions</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-with-icon">
                            <Mail size={20} className="input-icon" />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            'Sending Link...'
                        ) : (
                            <>
                                <span>Send Reset Link</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        className="text-btn"
                        onClick={onBackToLogin}
                        style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                    >
                        <ArrowLeft size={16} /> Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
