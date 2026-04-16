import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import DocumentList from './components/DocumentList'
import UploadModal from './components/UploadModal'
import Login from './components/Login'
import Register from './components/Register'
import PublicSearch from './components/PublicSearch'
import Settings from './components/Settings'
import Report from './components/Report'
import ForgotPassword from './components/ForgotPassword'
import AdminComplaints from './components/AdminComplaints'
import AdminVerifications from './components/AdminVerifications'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [authView, setAuthView] = useState('login');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    // Global mock state for Complaints with localStorage for cross-tab realtime sync
    const [complaints, setComplaints] = useState(() => {
        const saved = localStorage.getItem('landsecure_complaints');
        return saved ? JSON.parse(saved) : [
            { id: 'CMP-001', name: 'Rajesh Kumar', mobileNo: '9876543210', ownerOfLand: 'Suresh Kumar', issue: 'Boundary dispute with neighbor causing property damage', status: 'Pending', date: '2024-03-10' },
            { id: 'CMP-002', name: 'Anita Sharma', mobileNo: '9123456789', ownerOfLand: 'Anita Sharma', issue: 'Land tax records not updated for 2023', status: 'Resolved', date: '2024-03-05' },
        ];
    });

    // Global mock state for Verifications with localStorage
    const [requests, setRequests] = useState(() => {
        const saved = localStorage.getItem('landsecure_requests');
        return saved ? JSON.parse(saved) : [
            { id: 'REQ-101', type: 'Title Transfer', applicant: 'Ramesh Patel', propertyId: 'PROP-2049', submissionDate: '2024-03-12', status: 'Pending', proofs: ['Sale Deed', 'ID Proof', 'Tax Receipt'] },
            { id: 'REQ-102', type: 'New Registration', applicant: 'Priya Singh', propertyId: 'PROP-8832', submissionDate: '2024-03-11', status: 'Pending', proofs: ['Allotment Letter', 'ID Proof'] },
            { id: 'REQ-103', type: 'Mutation', applicant: 'Vikram Das', propertyId: 'PROP-1123', submissionDate: '2024-03-09', status: 'Approved', proofs: ['Death Certificate', 'Legal Heir Certificate'] }
        ];
    });

    // Save to localStorage when state changes
    useEffect(() => {
        localStorage.setItem('landsecure_complaints', JSON.stringify(complaints));
    }, [complaints]);

    useEffect(() => {
        localStorage.setItem('landsecure_requests', JSON.stringify(requests));
    }, [requests]);

    // Cross-tab actual realtime sync
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'landsecure_complaints') {
                setComplaints(JSON.parse(e.newValue));
            }
            if (e.key === 'landsecure_requests') {
                setRequests(JSON.parse(e.newValue));
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleAddComplaint = (newComplaint) => {
        setComplaints([{ ...newComplaint, id: `CMP-00${complaints.length + 1}`, status: 'Pending', date: new Date().toISOString() }, ...complaints]);
    };

    const handleResolveComplaint = (id) => {
        setComplaints(complaints.map(c => c.id === id ? { ...c, status: 'Resolved' } : c));
    };

    const handleAddRequest = (newReq) => {
        setRequests([{
            id: `REQ-10${requests.length + 1}`,
            type: newReq.docType || 'Document Upload',
            applicant: currentUserId || 'User',
            propertyId: 'PROP-NEW',
            submissionDate: new Date().toISOString(),
            status: 'Pending',
            proofs: [newReq.fileName || 'Uploaded Doc']
        }, ...requests]);
    };

    const handleActionRequest = (id, action) => {
        setRequests(requests.map(req => req.id === id ? { ...req, status: action === 'approve' ? 'Approved' : 'Rejected' } : req));
    };

    const handleLogin = (adminStatus = false, userId = null) => {
        setIsAuthenticated(true);
        setIsAdmin(adminStatus);
        setCurrentUserId(userId);
        setActiveTab('dashboard');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setActiveTab('dashboard');
    };

    const renderContent = () => {
        if (isAdmin) {
            switch (activeTab) {
                case 'dashboard':
                    return <Dashboard onNavigate={setActiveTab} isAdmin={true} />;
                case 'complaints':
                    return <AdminComplaints complaints={complaints} onResolve={handleResolveComplaint} />;
                case 'verifications':
                    return <AdminVerifications requests={requests} onAction={handleActionRequest} />;
                case 'settings':
                    return <Settings />;
                default:
                    return <Dashboard onNavigate={setActiveTab} isAdmin={true} />;
            }
        } else {
            switch (activeTab) {
                case 'dashboard':
                    return <Dashboard onNavigate={setActiveTab} />;
                case 'documents':
                    return <DocumentList onUpload={() => setIsUploadModalOpen(true)} requests={requests.filter(r => r.applicant.includes('Rajesh'))} />;
                case 'search':
                    return <PublicSearch />;
                case 'settings':
                    return <Settings />;
                case 'report':
                    return <Report onAddComplaint={handleAddComplaint} />;
                default:
                    return <Dashboard onNavigate={setActiveTab} />;
            }
        }
    };

    if (!isAuthenticated) {
        if (authView === 'register') {
            return (
                <Register
                    onRegister={() => setAuthView('login')}
                    onLoginClick={() => setAuthView('login')}
                />
            );
        }
        if (authView === 'forgot-password') {
            return (
                <ForgotPassword onBackToLogin={() => setAuthView('login')} />
            );
        }
        return (
            <Login
                onLogin={handleLogin}
                onRegisterClick={() => setAuthView('register')}
                onForgotPasswordClick={() => setAuthView('forgot-password')}
            />
        );
    }

    return (
        <div className="app-container">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
                isAdmin={isAdmin}
            />
            <div className="content">
                {renderContent()}
            </div>

            {isUploadModalOpen && (
                <UploadModal 
                    onClose={() => setIsUploadModalOpen(false)} 
                    onAddRequest={handleAddRequest} 
                />
            )}
        </div>
    )
}

export default App
