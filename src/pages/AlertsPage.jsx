import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { NIGERIAN_ZONES } from '../lib/constants';
import { SeverityBadge } from '../components/ui/Badge';
import { Bell, Send, CheckCircle, Clock, ShieldAlert, Megaphone, UserPlus, X } from 'lucide-react';
export const AlertsPage = () => {
    const { user, isAdmin } = useAuth();
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('warning');
    const [targetZone, setTargetZone] = useState('All Zones');
    const [expiresInHours, setExpiresInHours] = useState(24);
    const [broadcasting, setBroadcasting] = useState(false);
    const [successNotice, setSuccessNotice] = useState(false);
    const [showCreateOfficer, setShowCreateOfficer] = useState(false);
    const [officerName, setOfficerName] = useState('');
    const [officerEmail, setOfficerEmail] = useState('');
    const [officerPassword, setOfficerPassword] = useState('');
    const [officerPhone, setOfficerPhone] = useState('');
    const [officerZone, setOfficerZone] = useState('Oak Ridge Sector B');
    const [officerBadge, setOfficerBadge] = useState('');
    const [creatingOfficer, setCreatingOfficer] = useState(false);
    const [officerSuccess, setOfficerSuccess] = useState(false);
    const [officerError, setOfficerError] = useState(null);
    const loadAlerts = async () => {
        setLoading(true);
        try {
            const data = await api.getAlerts();
            setAlerts(data);
        }
        catch (err) {
            console.warn('Failed to load alerts', err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadAlerts();
    }, []);
    const handleBroadcast = async (e) => {
        e.preventDefault();
        if (!title.trim() || !message.trim())
            return;
        setBroadcasting(true);
        const expiresAt = new Date(Date.now() + expiresInHours * 3600 * 1000).toISOString();
        try {
            const newAlert = await api.createAlert({
                title: title.trim(),
                message: message.trim(),
                severity,
                targetZone,
                expiresAt,
            });
            setAlerts(prev => [newAlert, ...prev]);
            setTitle('');
            setMessage('');
            setSuccessNotice(true);
            setTimeout(() => setSuccessNotice(false), 4000);
        }
        catch (err) {
            console.warn('Broadcast failed', err);
        }
        finally {
            setBroadcasting(false);
        }
    };
    const handleDismiss = async (alertId) => {
        try {
            await api.dismissAlert(alertId);
            setAlerts(prev => prev.map(a => (a.id === alertId ? { ...a, active: false } : a)));
        }
        catch (err) {
            console.warn('Failed to dismiss alert', err);
        }
    };
    const handleCreateOfficer = async (e) => {
        e.preventDefault();
        setCreatingOfficer(true);
        setOfficerError(null);
        setOfficerSuccess(false);
        try {
            await api.register({
                name: officerName,
                email: officerEmail,
                password: officerPassword,
                role: 'patrol_officer',
                phone: officerPhone,
                zone: officerZone,
                badgeNumber: officerBadge || undefined,
            });
            setOfficerSuccess(true);
            setOfficerName('');
            setOfficerEmail('');
            setOfficerPassword('');
            setOfficerPhone('');
            setOfficerBadge('');
            setTimeout(() => {
                setOfficerSuccess(false);
                setShowCreateOfficer(false);
            }, 3000);
        }
        catch (err) {
            setOfficerError(err.message || 'Failed to create officer account');
        }
        finally {
            setCreatingOfficer(false);
        }
    };
    if (!isAdmin) {
        return (<div className="max-w-2xl mx-auto py-12 text-center bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 transition-colors">
        <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6"/>
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Estate Admin Authorization Required</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          The emergency broadcasting center is governed strictly by the Estate Community Development Association (CDA) Executive Board (such as Mrs. Folashade Okonkwo, Estate Admin).
        </p>
        <div className="pt-2">
          <p className="text-xs text-slate-400">
            Sign in with an admin account to access the alert broadcast center.
          </p>
        </div>
      </div>);
    }
    const activeAlerts = alerts.filter(a => a.active !== false);
    const archivedAlerts = alerts.filter(a => a.active === false);
    return (<div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-amber-600 dark:text-amber-400"/>
          Emergency Alert Broadcast Center
        </h1>
        <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
          Send verified notices directly to resident home feeds, estate security checkpoints, and mobile dashboards.
        </p>
      </div>

      <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-5 transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
            Dispatch New Safety Broadcast
          </h2>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Authorized: <strong className="text-slate-700 dark:text-slate-200">{user?.name}</strong>
          </span>
        </div>

        {successNotice && (<div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"/>
            <span>Broadcast dispatched successfully across target zones.</span>
          </div>)}

        <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              Broadcast Headline *
            </label>
            <input type="text" placeholder="e.g. Mandatory Curfew Notice: Sector B Gate Maintenance" value={title} onChange={e => setTitle(e.target.value)} required className="w-full h-11 px-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-hidden"/>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
              Actionable Instructions & Description *
            </label>
            <textarea rows={3} placeholder="Provide clear steps for residents (e.g. verify visitor badges, divert traffic to Gate 2)..." value={message} onChange={e => setMessage(e.target.value)} required className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-hidden resize-none"/>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Severity Level * (Strict Design System Token)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${severity === 'info'
            ? 'border-[#0284C7] bg-sky-50 dark:bg-sky-950/50 ring-2 ring-[#0284C7]'
            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" name="sev" value="info" checked={severity === 'info'} onChange={() => setSeverity('info')} className="sr-only"/>
                <span className="text-[11px] font-bold text-[#0284C7] dark:text-sky-400">INFO (#0284C7)</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">General estate updates</span>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${severity === 'warning'
            ? 'border-[#D97706] bg-amber-50 dark:bg-amber-950/50 ring-2 ring-[#D97706]'
            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" name="sev" value="warning" checked={severity === 'warning'} onChange={() => setSeverity('warning')} className="sr-only"/>
                <span className="text-[11px] font-bold text-[#D97706] dark:text-amber-400">WARNING (#D97706)</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Heightened caution</span>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${severity === 'critical'
            ? 'border-[#DC2626] bg-red-50 dark:bg-red-950/50 ring-2 ring-[#DC2626]'
            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" name="sev" value="critical" checked={severity === 'critical'} onChange={() => setSeverity('critical')} className="sr-only"/>
                <span className="text-[11px] font-bold text-[#DC2626] dark:text-red-400">CRITICAL (#DC2626)</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Active urgent risk</span>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${severity === 'emergency'
            ? 'border-[#7F1D1D] bg-red-100 dark:bg-red-950/80 ring-2 ring-[#7F1D1D]'
            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" name="sev" value="emergency" checked={severity === 'emergency'} onChange={() => setSeverity('emergency')} className="sr-only"/>
                <span className="text-[11px] font-extrabold text-[#7F1D1D] dark:text-red-300">EMERGENCY (#7F1D1D)</span>
                <span className="text-[10px] text-red-700 dark:text-red-400 font-bold mt-1">Life-safety strictly</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                Target Zone *
              </label>
              <select value={targetZone} onChange={e => setTargetZone(e.target.value)} className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-600 outline-hidden">
                <option value="All Zones">All Zones (Entire Estate Corridor)</option>
                {NIGERIAN_ZONES.filter(z => z !== 'All Zones').map(z => (<option key={z} value={z}>
                    {z}
                  </option>))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                Auto-Expire After *
              </label>
              <select value={expiresInHours} onChange={e => setExpiresInHours(Number(e.target.value))} className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-600 outline-hidden">
                <option value={2}>2 Hours</option>
                <option value={6}>6 Hours</option>
                <option value={12}>12 Hours</option>
                <option value={24}>24 Hours (1 Day)</option>
                <option value={72}>72 Hours (3 Days)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" disabled={broadcasting} className="w-full sm:w-auto px-8 h-11 bg-[#0F172A] dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              <Send className="w-3.5 h-3.5"/>
              <span>{broadcasting ? 'Transmitting Broadcast...' : 'Transmit Broadcast to Estate'}</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-colors">
        <button onClick={() => setShowCreateOfficer(!showCreateOfficer)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Register New Patrol Officer</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Create an account for a new security officer</p>
            </div>
          </div>
          <span className="text-slate-400 text-lg">{showCreateOfficer ? '−' : '+'}</span>
        </button>

        {showCreateOfficer && (
          <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-800 pt-5">
            {officerSuccess && (
              <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Patrol officer account created successfully.</span>
              </div>
            )}

            {officerError && (
              <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-300 flex items-center gap-2 mb-4">
                <X className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                <span>{officerError}</span>
              </div>
            )}

            <form onSubmit={handleCreateOfficer} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Full Name *</label>
                  <input type="text" value={officerName} onChange={e => setOfficerName(e.target.value)} required placeholder="e.g. Officer Musa Danladi" className="w-full h-11 px-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-hidden" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Email Address *</label>
                  <input type="email" value={officerEmail} onChange={e => setOfficerEmail(e.target.value)} required placeholder="officer@estate.ng" className="w-full h-11 px-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-hidden" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Temporary Password *</label>
                  <input type="password" value={officerPassword} onChange={e => setOfficerPassword(e.target.value)} required minLength={6} placeholder="Min 6 characters" className="w-full h-11 px-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-hidden" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Phone Number</label>
                  <input type="tel" value={officerPhone} onChange={e => setOfficerPhone(e.target.value)} placeholder="+234 802 000 1122" className="w-full h-11 px-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-hidden" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Assigned Zone *</label>
                  <select value={officerZone} onChange={e => setOfficerZone(e.target.value)} className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-600 outline-hidden">
                    {NIGERIAN_ZONES.filter(z => z !== 'All Zones').map(z => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Badge Number</label>
                  <input type="text" value={officerBadge} onChange={e => setOfficerBadge(e.target.value)} placeholder="e.g. BCN-042" className="w-full h-11 px-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-hidden" />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={creatingOfficer} className="inline-flex items-center gap-2 px-6 h-11 bg-[#0F172A] dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-md transition-colors disabled:opacity-50">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{creatingOfficer ? 'Creating Account...' : 'Create Officer Account'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Currently Active Broadcasts ({activeAlerts.length})
        </h2>

        {activeAlerts.length > 0 ? (<div className="space-y-3">
            {activeAlerts.map(alert => (<div key={alert.id} className="p-4 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-xs transition-colors">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={alert.severity} size="sm"/>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{alert.title}</h3>
                  </div>
                  <button onClick={() => handleDismiss(alert.id)} className="text-xs text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors">
                    Expire / Dismiss
                  </button>
                </div>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{alert.message}</p>

                <div className="flex items-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span>Target: <strong className="text-slate-700 dark:text-slate-300">{alert.targetZone}</strong></span>
                  <span>•</span>
                  <span>Issued by: <strong className="text-slate-700 dark:text-slate-300">{alert.createdBy?.name || 'Estate Admin'}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3"/>
                    Expires: {new Date(alert.expiresAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>))}
          </div>) : (<div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
            No active emergency broadcasts at this time.
          </div>)}
      </div>

      {archivedAlerts.length > 0 && (<div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Broadcast Archive ({archivedAlerts.length})
          </h3>
          <div className="space-y-2">
            {archivedAlerts.map(alert => (<div key={alert.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between text-slate-500 opacity-70">
                <div className="flex items-center gap-2 truncate">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{alert.title}</span>
                  <span>•</span>
                  <span className="text-[11px]">{alert.targetZone}</span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Archived
                </span>
              </div>))}
          </div>
        </div>)}
    </div>);
};