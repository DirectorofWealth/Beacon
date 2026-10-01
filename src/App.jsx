import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth, getStoredUser } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { IncidentsPage } from './pages/IncidentsPage';
import { IncidentDetailPage } from './pages/IncidentDetailPage';
import { ReportIncidentPage } from './pages/ReportIncidentPage';
import { PatrolPage } from './pages/PatrolPage';
import { AlertsPage } from './pages/AlertsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPages';
import { DesignSystemSpecModal } from './components/docs/DesignSystemSpecModal';
function BeaconApp() {
    const { isAuthenticated } = useAuth();
    const [currentView, setCurrentView] = useState(() => {
        return getStoredUser() ? 'home' : 'landing';
    });
    const [selectedIncidentId, setSelectedIncidentId] = useState(null);
    const [docsModalOpen, setDocsModalOpen] = useState(false);
    const [postAuthRedirect, setPostAuthRedirect] = useState(null);
    useEffect(() => {
        if (isAuthenticated && (currentView === 'login' || currentView === 'register')) {
            if (postAuthRedirect) {
                const dest = postAuthRedirect;
                setPostAuthRedirect(null);
                setCurrentView(dest);
            }
            else {
                setCurrentView('home');
            }
        }
    }, [isAuthenticated, currentView, postAuthRedirect]);
    const handleNavigate = (view, id) => {
        if (id) {
            setSelectedIncidentId(id);
        }
        const protectedViews = ['report', 'patrol', 'alerts', 'profile', 'incidents', 'incident-detail', 'home'];
        if (!isAuthenticated && protectedViews.includes(view)) {
            setPostAuthRedirect(view);
            setCurrentView('login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (view !== 'login' && view !== 'register') {
            setPostAuthRedirect(null);
        }
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (currentView === 'landing') {
        return (<>
        <LandingPage onNavigate={handleNavigate}/>
        <Footer onOpenDocs={() => setDocsModalOpen(true)} onNavigate={handleNavigate}/>
        <DesignSystemSpecModal isOpen={docsModalOpen} onClose={() => setDocsModalOpen(false)}/>
      </>);
    }
    return (<div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#070D18] text-[#1E293B] dark:text-[#E2E8F0] font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
      <Header currentView={currentView} onNavigate={handleNavigate} onOpenDocs={() => setDocsModalOpen(true)}/>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-22 sm:pt-24">
        {currentView === 'home' && (<HomePage onNavigate={handleNavigate} onOpenDocs={() => setDocsModalOpen(true)}/>)}

        {currentView === 'incidents' && (<IncidentsPage onNavigate={handleNavigate}/>)}

        {currentView === 'incident-detail' && selectedIncidentId && (<IncidentDetailPage incidentId={selectedIncidentId} onBack={() => handleNavigate('incidents')} onNavigate={handleNavigate}/>)}

        {currentView === 'report' && (<ReportIncidentPage onBack={() => handleNavigate(isAuthenticated ? 'home' : 'landing')} onSuccess={newId => handleNavigate('incident-detail', newId)}/>)}

        {currentView === 'patrol' && <PatrolPage />}

        {currentView === 'alerts' && <AlertsPage />}

        {currentView === 'profile' && (<ProfilePage onOpenDocs={() => setDocsModalOpen(true)}/>)}

        {currentView === 'login' && (<AuthPage mode="login" onNavigate={handleNavigate} fromReport={postAuthRedirect === 'report'}/>)}

        {currentView === 'register' && (<AuthPage mode="register" onNavigate={handleNavigate} fromReport={postAuthRedirect === 'report'}/>)}
      </main>

      {currentView !== 'login' && currentView !== 'register' && (
        <Footer onOpenDocs={() => setDocsModalOpen(true)} onNavigate={handleNavigate}/>
      )}

      <DesignSystemSpecModal isOpen={docsModalOpen} onClose={() => setDocsModalOpen(false)}/>
    </div>);
}
export default function App() {
    return (<ThemeProvider>
      <AuthProvider>
        <BeaconApp />
      </AuthProvider>
    </ThemeProvider>);
}