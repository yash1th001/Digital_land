import React, { useState } from 'react';

const Report = () => {
    const [reportType, setReportType] = useState('');

    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle report submission logic here
        console.log('Report submitted:', { reportType, description });
        alert('Report submitted successfully!');
        setDescription('');
    };

    return (
        <div className="report-container glass-panel">
            <h2>Report an Issue</h2>
            <form onSubmit={handleSubmit} className="report-form">
                <div className="form-group">
                    <label>Type of Report</label>
                    <input
                        type="text"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="form-control"
                        placeholder="e.g. Bug Report, Feature Request"
                        required
                    />

                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        rows="5"
                        placeholder="Describe the issue or feature request..."
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Submit Report</button>
            </form>
            <style jsx>{`
                .report-container {
                    padding: 2rem;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .report-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-control {
                    padding: 0.75rem;
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    background: rgba(255, 255, 255, 0.05);
                    color: inherit;
                }
                .submit-btn {
                    padding: 0.75rem 1.5rem;
                    background-color: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    align-self: flex-start;
                }
                .submit-btn:hover {
                    opacity: 0.9;
                }
            `}</style>
        </div>
    );
};

export default Report;
