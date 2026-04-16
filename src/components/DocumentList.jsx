import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Plus, FileText } from 'lucide-react';
import { MOCK_DOCUMENTS } from '../data/mockData';

const DocumentList = ({ onUpload, requests = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const formattedRequests = requests.map(req => ({
        id: req.id,
        title: `${req.proofs[0] || 'Document'} - ${req.type}`,
        type: req.type.toLowerCase().includes('tax') ? 'tax' : 
              req.type.toLowerCase().includes('survey') ? 'survey' :
              req.type.toLowerCase().includes('legal') ? 'legal' : 'ownership',
        date: new Date(req.submissionDate).toISOString().split('T')[0],
        size: 'Pending Check',
        status: req.status.toLowerCase(),
        plotId: req.propertyId
    }));

    const allDocs = [...formattedRequests, ...MOCK_DOCUMENTS];

    const filteredDocs = allDocs.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.plotId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || doc.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="document-list-container fade-in">
            <div className="page-header">
                <div className="header-title">
                    <h1>My Records</h1>
                    <p>Manage your land ownership documents and certificates.</p>
                </div>
                <button className="glass-button" onClick={onUpload}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} />
                        <span>Upload New</span>
                    </div>
                </button>
            </div>

            <div className="controls-bar glass-panel">
                <div className="search-box">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by Title or Plot ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-box">
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="all">All Types</option>
                        <option value="ownership">Ownership</option>
                        <option value="tax">Tax Receipts</option>
                        <option value="survey">Survey Maps</option>
                        <option value="legal">Legal/Encumbrance</option>
                    </select>
                    <Filter size={18} className="filter-icon" />
                </div>
            </div>

            <div className="docs-table-container glass-panel">
                <table className="docs-table">
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Plot ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Size</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDocs.length > 0 ? (
                            filteredDocs.map((doc) => (
                                <tr key={doc.id}>
                                    <td>
                                        <div className="doc-name-cell">
                                            <div className="doc-icon">
                                                <FileText size={18} />
                                            </div>
                                            <span>{doc.title}</span>
                                        </div>
                                    </td>
                                    <td>{doc.plotId}</td>
                                    <td>{doc.date}</td>
                                    <td>
                                        <span className={`status-badge ${doc.status}`}>
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td>{doc.size}</td>
                                    <td>
                                        <div className="action-cell">
                                            <button className="icon-btn" title="View">
                                                <Eye size={18} />
                                            </button>
                                            <button className="icon-btn" title="Download">
                                                <Download size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="empty-state">
                                    No documents found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DocumentList;
