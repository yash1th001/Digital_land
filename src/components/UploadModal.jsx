import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle, File } from 'lucide-react';

const UploadModal = ({ onClose, onAddRequest }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success
    const [docType, setDocType] = useState('ownership');

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const startUpload = () => {
        if (!file) return;

        setUploadStatus('uploading');
        setUploadProgress(0);

        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploadStatus('success');
                    
                    // Emit payload to App
                    if (onAddRequest) {
                        onAddRequest({
                            fileName: file.name,
                            docType: getDocTypeLabel(docType)
                        });
                    }
                    
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const getDocTypeLabel = (value) => {
        switch(value) {
            case 'ownership': return 'Title Transfer';
            case 'tax': return 'Property Tax Record';
            case 'survey': return 'Mutation';
            case 'legal': return 'Legal Assessment';
            case 'other': return 'Other Request';
            default: return 'Document Upload';
        }
    };

    return (
        <div className="modal-overlay fade-in">
            <div className="modal-content glass-panel">
                <div className="modal-header">
                    <h2>Upload Document</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    {uploadStatus === 'success' ? (
                        <div className="upload-success">
                            <CheckCircle size={64} className="success-icon" />
                            <h3>Upload Successful!</h3>
                            <p>Your document has been securely uploaded and is pending verification by an Admin.</p>
                            <button className="glass-button" onClick={onClose}>Done</button>
                        </div>
                    ) : (
                        <>
                            <div
                                className={`upload-zone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById('file-input').click()}
                            >
                                <input
                                    type="file"
                                    id="file-input"
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                />

                                {file ? (
                                    <div className="file-preview">
                                        <File size={48} className="file-icon" />
                                        <span className="filename">{file.name}</span>
                                        <span className="filesize">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                    </div>
                                ) : (
                                    <>
                                        <UploadCloud size={48} className="upload-icon" />
                                        <p>Drag & Drop your file here</p>
                                        <span>or click to browse</span>
                                    </>
                                )}
                            </div>

                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                <label style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Document Type</label>
                                <select
                                    className="glass-select"
                                    value={docType}
                                    onChange={(e) => setDocType(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', outline: 'none' }}
                                >
                                    <option value="ownership" style={{ color: 'black' }}>Ownership Document (Title Transfer)</option>
                                    <option value="survey" style={{ color: 'black' }}>Survey Map / Plan (Mutation)</option>
                                    <option value="tax" style={{ color: 'black' }}>Property Tax Receipt</option>
                                    <option value="legal" style={{ color: 'black' }}>Legal / Encumbrance Certificate</option>
                                    <option value="other" style={{ color: 'black' }}>Other</option>
                                </select>
                            </div>

                            {uploadStatus === 'uploading' && (
                                <div className="progress-container">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                    <span>Uploading... {uploadProgress}%</span>
                                </div>
                            )}

                            <div className="modal-actions">
                                <button
                                    className="glass-button secondary"
                                    onClick={onClose}
                                    disabled={uploadStatus === 'uploading'}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="glass-button"
                                    onClick={startUpload}
                                    disabled={!file || uploadStatus === 'uploading'}
                                >
                                    {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Now'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadModal;
