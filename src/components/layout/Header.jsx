import React, { useState } from 'react';
import { BrandLogo } from '../ui/BrandLogo';
import { RoleBadge } from '../ui/Badge';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, PlusCircle, Shield, Bell, User, LogOut, ChevronDown, } from 'lucide-react';
export const Header = ({ currentView, onNavigate, onOpenDocs }) => {
    const { user, isAuthenticated, isOfficer, isAdmin, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [personaPickerOpen, setPersonaPickerOpen] = useState(false);
    const handleNav = (view) => {
        onNavigate(view);
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
    };
    return (<header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-slate-800 z-50 transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => handleNav(isAuthenticated ? 'home' : 'landing')} className="focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-lg">
            <BrandLogo size="md" showSubtitle={false}/>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {isAuthenticated ? (<>
                <button onClick={() => handleNav('home')} className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${currentView === 'home'
                ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60'
                : 'text-[#1E293B] dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/80'}`}>
                  Home
                </button>
                <button onClick={() => handleNav('incidents')} className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${currentView === 'incidents' || currentView === 'incident-detail'
                ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60'
                : 'text-[#1E293B] dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/80'}`}>
                  Incidents
                </button>
                {isOfficer && (<button onClick={() => handleNav('patrol')} className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-1.5 ${currentView === 'patrol'
                    ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60'
                    : 'text-[#1E293B] dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/80'}`}>
                    <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
                    Patrol
                  </button>)}
                {isAdmin && (<button onClick={() => handleNav('alerts')} className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-1.5 ${currentView === 'alerts'
                    ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60'
                    : 'text-[#1E293B] dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/80'}`}>
                    <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400"/>
                    Alerts
                  </button>)}
              </>) : currentView === 'login' || currentView === 'register' ? null : (<>
                <button onClick={() => handleNav('landing')} className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${currentView === 'landing'
                ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60'
                : 'text-[#1E293B] dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/80'}`}>
                  Overview
                </button>
                <button onClick={() => handleNav('incidents')} className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${currentView === 'incidents' || currentView === 'incident-detail'
                ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60'
                : 'text-[#1E293B] dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/80'}`}>
                  Incidents
                </button>
              </>)}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle size="sm"/>

          <button onClick={() => handleNav('report')} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0F172A] dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 rounded-md shadow-xs transition-colors">
            <PlusCircle className="w-3.5 h-3.5 text-[#E5A00D] dark:text-white"/>
            <span>Report Incident</span>
          </button>

          {isAuthenticated && user ? (<div className="relative">
              <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="w-7 h-7 rounded-md bg-[#0F172A] dark:bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <RoleBadge role={user.role}/>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400"/>
              </button>

              {userDropdownOpen && (<div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50 animate-fadeIn text-xs" onClick={e => e.stopPropagation()}>
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] truncate">{user.email}</p>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-0.5">Zone: {user.zone}</p>
                  </div>

                  <button onClick={() => handleNav('profile')} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-400"/>
                    My Profile & Settings
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800"/>

                  <button onClick={() => {
                    logout();
                    setUserDropdownOpen(false);
                    handleNav('landing');
                }} className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                    <LogOut className="w-3.5 h-3.5"/>
                    Sign Out
                  </button>
                </div>)}
            </div>) : (<div className="flex items-center gap-2">
              <button onClick={() => handleNav('register')} className="px-3.5 py-2 text-sm font-semibold text-white bg-[#0F172A] dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 rounded-md transition-colors">
                Create Account
              </button>
            </div>)}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle size="sm"/>
          {!(currentView === 'login' || currentView === 'register') && (<>
              <button onClick={() => handleNav('report')} className="p-1.5 text-white bg-[#2563EB] rounded-md" title="Report">
                <PlusCircle className="w-5 h-5"/>
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
              </button>
            </>)}
        </div>
      </div>

      {mobileMenuOpen && (<div className="md:hidden fixed inset-x-0 top-16 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800 shadow-2xl p-4 space-y-3 z-50 animate-fadeIn max-h-[calc(100vh-4rem)] overflow-y-auto">
          {isAuthenticated && user ? (<div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{user.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <RoleBadge role={user.role}/>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{user.zone}</span>
                </div>
              </div>
              <button onClick={() => handleNav('profile')} className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                Profile
              </button>
            </div>) : (<div className="flex">
              <button onClick={() => handleNav('register')} className="w-full py-2.5 text-center text-sm font-semibold rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white">
                Create Account
              </button>
            </div>)}

          <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <button onClick={() => handleNav('home')} className={`p-2.5 rounded-lg text-left ${currentView === 'home' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              Home
            </button>
            <button onClick={() => handleNav('incidents')} className={`p-2.5 rounded-lg text-left ${currentView === 'incidents' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              Incident Feed
            </button>

            {isOfficer && (<button onClick={() => handleNav('patrol')} className={`p-2.5 rounded-lg text-left flex items-center gap-2 ${currentView === 'patrol' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
                Patrol Management
              </button>)}

            {isAdmin && (<button onClick={() => handleNav('alerts')} className={`p-2.5 rounded-lg text-left flex items-center gap-2 ${currentView === 'alerts' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400"/>
                Emergency Alerts
              </button>)}

            <button onClick={() => handleNav('report')} className="p-2.5 rounded-lg text-left bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2">
              <PlusCircle className="w-4 h-4"/>
              File New Incident Report
            </button>
          </nav>

        </div>)}
    </header>);
};