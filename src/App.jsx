import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
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

const NAVIGATION_STORAGE_KEY = 'beacon_navigation_state';
const APP_VIEWS = ['landing', 'home', 'incidents', 'incident-detail', 'report', 'patrol', 'alerts', 'profile', 'login', 'register'];
const PROTECTED_VIEWS = ['report', 'patrol', 'alerts', 'profile', 'incidents', 'incident-detail', 'home'];

function getInitialNavigation() {
    try {
        const saved = JSON.parse(window.sessionStorage.getItem(NAVIGATION_STORAGE_KEY) || 'null');
        if (!saved || !APP_VIEWS.includes(saved.currentView)) {
            return { currentView: 'landing', selectedIncidentId: null, postAuthRedirect: null };
        }
        if (saved.currentView === 'incident-detail' && !saved.selectedIncidentId) {
            return { currentView: 'landing', selectedIncidentId: null, postAuthRedirect: null };
        }
        return {
            currentView: saved.currentView,
            selectedIncidentId: saved.selectedIncidentId || null,
            postAuthRedirect: PROTECTED_VIEWS.includes(saved.postAuthRedirect) ? saved.postAuthRedirect : null,
        };
    }
    catch {
        return { currentView: 'landing', selectedIncidentId: null, postAuthRedirect: null };
    }
}

function BeaconApp() {
    const { isAuthenticated } = useAuth();
    const [initialNavigation] = useState(getInitialNavigation);
    const [currentView, setCurrentView] = useState(initialNavigation.currentView);
    const [selectedIncidentId, setSelectedIncidentId] = useState(initialNavigation.selectedIncidentId);
    const [docsModalOpen, setDocsModalOpen] = useState(false);
    const [postAuthRedirect, setPostAuthRedirect] = useState(initialNavigation.postAuthRedirect);
    useEffect(() => {
        try {
            window.sessionStorage.setItem(NAVIGATION_STORAGE_KEY, JSON.stringify({
                currentView,
                selectedIncidentId,
                postAuthRedirect,
            }));
        }
        catch {
            // Keep navigation usable if browser storage is unavailable.
        }
    }, [currentView, selectedIncidentId, postAuthRedirect]);
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
        if (!isAuthenticated && PROTECTED_VIEWS.includes(view)) {
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
