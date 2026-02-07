import { useState } from 'react'
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


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authView, setAuthView] = useState('login'); // 'login' or 'register'
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setActiveTab('dashboard');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard onNavigate={setActiveTab} />;
            case 'documents':
                return <DocumentList onUpload={() => setIsUploadModalOpen(true)} />;
            case 'search':
                return <PublicSearch />;
            case 'settings':
                return <Settings />;
            case 'report':
                return <Report />;
            default:

                return <Dashboard onNavigate={setActiveTab} />;
        }
    };

    if (!isAuthenticated) {
        if (authView === 'register') {
            return (
                <Register
                    onRegister={() => {
                        setAuthView('login');
                        // Optionally show a success message here or auto-login
                        // For now we just redirect to login so they can log in
                    }}
                    onLoginClick={() => setAuthView('login')}
                />
            );
        }
        if (authView === 'forgot-password') {
            return (
                <ForgotPassword
                    onBackToLogin={() => setAuthView('login')}
                />
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
            />
            <div className="content">
                {renderContent()}
            </div>

            {isUploadModalOpen && (
                <UploadModal onClose={() => setIsUploadModalOpen(false)} />
            )}
        </div>
    )
}

export default App
