import React, { useState } from 'react';
import { Search, MapPin, Building, FileCheck, ArrowRight, Filter } from 'lucide-react';

const MOCK_PUBLIC_RECORDS = [
    {
        id: 'LR-2024-001',
        owner: 'Amitabh Verma',
        surveyNo: 'SN-402/A',
        district: 'Visakhapatnam',
        area: '1200 sq. ft.',
        type: 'Residential',
        status: 'Clear'
    },
    {
        id: 'LR-2024-002',
        owner: 'Priya Sharma',
        surveyNo: 'SN-881/B',
        district: 'Guntur',
        area: '2400 sq. ft.',
        type: 'Commercial',
        status: 'Mortgaged'
    },
    {
        id: 'LR-2024-003',
        owner: 'Rajesh Kumar',
        surveyNo: 'ND-GP-45A',
        district: 'Vijayawada',
        area: '1500 sq. ft.',
        type: 'Residential',
        status: 'Clear'
    },
    {
        id: 'LR-2024-004',
        owner: 'K. L. Housing Pvt Ltd',
        surveyNo: 'DL-Ind-99',
        district: 'Tirupati',
        area: '5000 sq. ft.',
        type: 'Industrial',
        status: 'Disputed'
    }
];

const PublicSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState(null);
    const [filterDistrict, setFilterDistrict] = useState('All');

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);
        setResults(null);

        // Simulate API search latency
        setTimeout(() => {
            const filtered = MOCK_PUBLIC_RECORDS.filter(record =>
                (record.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    record.surveyNo.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (filterDistrict === 'All' || record.district.includes(filterDistrict))
            );
            setResults(filtered);
            setIsSearching(false);
        }, 1200);
    };

    return (
        <div className="dashboard-container fade-in">
            <div className="search-header glass-panel">
                <div className="header-content">
                    <h1>Public Records Search</h1>
                    <p>Verify land ownership and view property details instantly.</p>
                </div>

                <form onSubmit={handleSearch} className="search-bar-container">
                    <div className="search-input-wrapper">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Enter Survey No, Owner Name, or Property ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="filter-wrapper">
                        <Filter className="filter-icon" size={18} />
                        <select
                            value={filterDistrict}
                            onChange={(e) => setFilterDistrict(e.target.value)}
                            className="glass-select"
                        >
                            <option value="All">All Districts</option>
                            <option value="Visakhapatnam">Visakhapatnam</option>
                            <option value="Guntur">Guntur</option>
                            <option value="Vijayawada">Vijayawada</option>
                            <option value="Tirupati">Tirupati</option>
                            <option value="Nellore">Nellore</option>
                        </select>
                    </div>

                    <button type="submit" className="glass-button search-btn" disabled={isSearching}>
                        {isSearching ? 'Searching...' : 'Search Records'}
                    </button>
                </form>
            </div>

            <div className="results-area">
                {!results && !isSearching && (
                    <div className="empty-state glass-panel">
                        <Search size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                        <h3>Start Searching</h3>
                        <p>Enter details above to find land records.</p>
                    </div>
                )}

                {results && results.length === 0 && (
                    <div className="empty-state glass-panel">
                        <h3>No Records Found</h3>
                        <p>Try adjusting your search terms or filters.</p>
                    </div>
                )}

                {results && results.length > 0 && (
                    <div className="records-grid">
                        {results.map((record) => (
                            <div key={record.id} className="record-card glass-panel fade-in">
                                <div className="card-header">
                                    <div className="record-badge">
                                        <Building size={14} /> {record.type}
                                    </div>
                                    <span className={`status-badge ${record.status.toLowerCase()}`}>
                                        {record.status}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <h3>{record.surveyNo}</h3>
                                    <div className="record-detail">
                                        <span className="label">Owner</span>
                                        <span className="value">{record.owner}</span>
                                    </div>
                                    <div className="record-detail">
                                        <span className="label">Location</span>
                                        <span className="value">{record.district}</span>
                                    </div>
                                    <div className="record-detail">
                                        <span className="label">Area</span>
                                        <span className="value">{record.area}</span>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="text-btn">
                                        View Details <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .search-header {
                    margin-bottom: 2rem;
                    padding: 2.5rem;
                }
                .search-bar-container {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }
                .search-input-wrapper {
                    flex: 2;
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 0 1rem;
                    min-width: 300px;
                }
                .search-input-wrapper input {
                    width: 100%;
                    background: transparent;
                    border: none;
                    padding: 1rem;
                    color: white;
                    font-size: 1rem;
                    outline: none;
                }
                .filter-wrapper {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 0 1rem;
                    min-width: 150px;
                }
                .glass-select {
                    width: 100%;
                    background: transparent;
                    border: none;
                    color: white;
                    padding: 1rem;
                    font-size: 0.95rem;
                    outline: none;
                    margin-left: 0.5rem;
                }
                .glass-select option {
                    background: #1a1f3c; /* Fallback dark color */
                    color: white;
                }
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem;
                    text-align: center;
                    color: var(--text-secondary);
                }
                .records-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                .record-card {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }
                .record-badge {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.8rem;
                    padding: 0.25rem 0.75rem;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    color: var(--text-secondary);
                }
                .status-badge {
                    font-size: 0.75rem;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-weight: 600;
                    text-transform: uppercase;
                }
                .status-badge.clear {
                    background: rgba(16, 185, 129, 0.2);
                    color: #10b981;
                }
                .status-badge.mortgaged {
                    background: rgba(245, 158, 11, 0.2);
                    color: #f59e0b;
                }
                .status-badge.disputed {
                    background: rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                }
                .record-detail {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                .record-detail:last-child {
                    border-bottom: none;
                }
                .label {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                .value {
                    font-weight: 500;
                }
                .card-footer {
                    margin-top: auto;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: flex-end;
                }
            `}</style>
        </div>
    );
};

export default PublicSearch;
