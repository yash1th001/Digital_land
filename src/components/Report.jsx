import React, { useState } from 'react';

const Report = ({ onAddComplaint }) => {
    const [issue, setIssue] = useState('');
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [ownerOfLand, setOwnerOfLand] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (onAddComplaint) {
            onAddComplaint({ issue, name, mobileNo, ownerOfLand });
        }
        
        console.log('Complaint submitted:', { issue, name, mobileNo, ownerOfLand });
        alert('Complaint submitted successfully!');
        setIssue('');
        setName('');
        setMobileNo('');
        setOwnerOfLand('');
    };

    return (
        <div className="report-container glass-panel">
            <h2>Complaint Form</h2>
            <form onSubmit={handleSubmit} className="report-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mobile No</label>
                    <input
                        type="tel"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        className="form-control"
                        placeholder="Your Mobile Number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Owner of Land</label>
                    <input
                        type="text"
                        value={ownerOfLand}
                        onChange={(e) => setOwnerOfLand(e.target.value)}
                        className="form-control"
                        placeholder="Name of Land Owner"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Issue</label>
                    <textarea
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                        className="form-control"
                        rows="5"
                        placeholder="Describe the issue..."
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Submit Complaint</button>
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
