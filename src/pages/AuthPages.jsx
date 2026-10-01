import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from '../components/ui/BrandLogo';
import { NIGERIAN_ZONES } from '../lib/constants';
import { api } from '../lib/api';
import { Lock, Mail, User, Phone, MapPin, AlertCircle, AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';
export const AuthPage = ({ mode, onNavigate, fromReport = false }) => {
    const { login, register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [zone, setZone] = useState('Lekki Phase 1');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [authMode, setAuthMode] = useState('resident');
    const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetLoading, setResetLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [resetError, setResetError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (mode === 'login') {
                await login(email, password);
            }
            else {
                const role = authMode === 'admin' ? 'admin' : 'resident';
                await register({ name, email, password, phone, zone, role });
            }
            onNavigate(fromReport ? 'report' : 'home');
        }
        catch (err) {
            setError(err.message || 'Authentication failed');
        }
        finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setResetLoading(true);
        setResetError(null);
        setResetSuccess(false);
        try {
            await api.requestPasswordReset(resetEmail);
            setResetSuccess(true);
        }
        catch (err) {
            setResetError(err.message || 'Failed to send reset link');
        }
        finally {
            setResetLoading(false);
        }
    };
    if (forgotPasswordMode) {
        return (<div className="max-w-md mx-auto py-8 sm:py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-block">
          <BrandLogo size="lg"/>
        </div>
        <h1 className="text-xl font-extrabold text-[#0F172A] dark:text-white">
          Reset Your Password
        </h1>
        <p className="text-xs text-[#64748B] dark:text-slate-400">
          Enter your email address and we will send you a link to reset your password.
        </p>
      </div>

      <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-colors">
        <div className="p-6 sm:p-8 space-y-5">
          {resetSuccess && (<div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"/>
              <span>Password reset link sent! Check your email for instructions.</span>
            </div>)}

          {resetError && (<div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0"/>
              <span>{resetError}</span>
            </div>)}

          <form onSubmit={handleForgotPassword} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                <input type="email" required placeholder="resident@estate.ng" value={resetEmail} onChange={e => setResetEmail(e.target.value)} className="w-full h-10 pl-9 pr-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-blue-600"/>
              </div>
            </div>

            <button type="submit" disabled={resetLoading} className="w-full h-11 bg-[#0F172A] dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50 mt-2">
              {resetLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="pt-3 text-center border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <button type="button" onClick={() => {
              setForgotPasswordMode(false);
              setResetSuccess(false);
              setResetError(null);
            }} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold underline ml-1 inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3"/>
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>);
    }

    return (<div className="max-w-md mx-auto py-8 sm:py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-block">
          <BrandLogo size="lg"/>
        </div>
        <h1 className="text-xl font-extrabold text-[#0F172A] dark:text-white">
          {mode === 'login' ? 'Sign in to your estate community' : 'Join your neighborhood Beacon'}
        </h1>
        <p className="text-xs text-[#64748B] dark:text-slate-400">
          {mode === 'login'
            ? 'Access structured reports, active patrol shifts, and emergency alerts.'
            : 'Register to report incidents, confirm neighborhood safety, and receive alerts.'}
        </p>
      </div>

      {fromReport && (<div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"/>
          <div className="space-y-1">
            <p className="font-bold text-sm text-amber-950 dark:text-amber-100">
              Sign In to File Incident Report
            </p>
            <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
              Verified resident authentication is required to dispatch patrol officers. If you do not have an account, switch to <strong className="font-bold underline cursor-pointer" onClick={() => onNavigate('register')}>Sign Up</strong> below to register in 30 seconds.
            </p>
          </div>
        </div>)}

      <div className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl">
        <button type="button" onClick={() => setAuthMode('resident')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${authMode === 'resident'
          ? 'bg-[#0F172A] dark:bg-blue-600 text-white shadow-xs'
          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
          Resident
        </button>
        <button type="button" onClick={() => setAuthMode('admin')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${authMode === 'admin'
          ? 'bg-[#0F172A] dark:bg-blue-600 text-white shadow-xs'
          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
          Admin
        </button>
      </div>

      <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-colors">
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <button type="button" onClick={() => onNavigate('login')} className={`flex-1 py-3 text-center text-xs font-bold transition-all border-b-2 ${mode === 'login'
            ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-[#0F172A]'
            : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
            Sign In
          </button>
          <button type="button" onClick={() => onNavigate('register')} className={`flex-1 py-3 text-center text-xs font-bold transition-all border-b-2 ${mode === 'register'
            ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-[#0F172A]'
            : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}>
            Sign Up (No Account)
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          {error && (<div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0"/>
              <span>{error}</span>
            </div>)}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (<>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                  <input type="text" required placeholder="e.g. Chinedu Okafor" value={name} onChange={e => setName(e.target.value)} className="w-full h-10 pl-9 pr-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-blue-600"/>
                </div>
              </div>

              {authMode === 'resident' && (<>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number (SMS Dispatch) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                    <input type="tel" required placeholder="+234 803 123 4567" value={phone} onChange={e => setPhone(e.target.value)} className="w-full h-10 pl-9 pr-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-blue-600"/>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Residential Estate Zone *</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                    <select value={zone} onChange={e => setZone(e.target.value)} className="w-full h-10 pl-9 pr-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white font-semibold outline-hidden focus:ring-2 focus:ring-blue-600 truncate">
                      {NIGERIAN_ZONES.filter(z => z !== 'All Zones').map(z => (<option key={z} value={z}>
                          {z}
                        </option>))}
                    </select>
                  </div>
                </div>
              </>)}
            </>)}

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
              <input type="email" required placeholder="resident@estate.ng" value={email} onChange={e => setEmail(e.target.value)} className="w-full h-10 pl-9 pr-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-blue-600"/>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
              <input type="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full h-10 pl-9 pr-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-blue-600"/>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full h-11 bg-[#0F172A] dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50 mt-2">
            {loading
            ? 'Authenticating...'
            : mode === 'login'
                ? `Sign In as ${authMode === 'admin' ? 'Admin' : 'Resident'}`
                : `Create ${authMode === 'admin' ? 'Admin' : 'Resident'} Account`}
          </button>
        </form>

        {mode === 'login' && (<div className="text-center mt-3">
            <button type="button" onClick={() => {
              setForgotPasswordMode(true);
              setResetEmail(email);
            }} className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Forgot your password?
            </button>
          </div>)}

        <div className="pt-3 text-center border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          {mode === 'login' ? (<p>
              Don&apos;t have an account?{' '}
              <button type="button" onClick={() => onNavigate('register')} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold underline ml-1">
                Sign Up (Create Account)
              </button>
            </p>) : (<p>
              Already have an account?{' '}
              <button type="button" onClick={() => onNavigate('login')} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold underline ml-1">
                Sign In
              </button>
            </p>)}
        </div>
      </div>
    </div>
  </div>);
};