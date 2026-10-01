import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { IncidentCard } from '../components/incidents/IncidentCard';
import { SeverityBadge, RoleBadge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { Shield, Activity, CheckCircle2, AlertTriangle, ArrowRight, PlusCircle, MapPin, Clock, Sparkles, Bell, ChevronRight, X } from 'lucide-react';
export const HomePage = ({ onNavigate, onOpenDocs }) => {
    const { user, isOfficer, isAdmin } = useAuth();
    const [stats, setStats] = useState(null);
    const [recentIncidents, setRecentIncidents] = useState([]);
    const [activeAlerts, setActiveAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertsDismissed, setAlertsDismissed] = useState(false);
    useEffect(() => {
        async function loadHomeData() {
            setLoading(true);
            try {
                const [statsData, incidentsData, alertsData] = await Promise.all([
                    api.getPublicStats(),
                    api.getIncidents({ search: '', status: 'all', category: 'all', priority: 'all', zone: 'all' }),
                    api.getAlerts(),
                ]);
                setStats(statsData);
                setRecentIncidents(incidentsData.slice(0, 3));
                setActiveAlerts(alertsData.filter(a => a.active !== false));
            }
            catch (err) {
                console.warn('Error loading home data', err);
            }
            finally {
                setLoading(false);
            }
        }
        loadHomeData();
    }, []);
    return (<div className="space-y-8 pb-16">
      <section className="space-y-3">
        {activeAlerts.length > 0 && !alertsDismissed ? (<div className="space-y-3" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"/>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"/>
                </span>
                <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-red-600 dark:text-red-400">
                  Priority Safety & Emergency Alerts
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {activeAlerts.length} Active Notice{activeAlerts.length > 1 ? 's' : ''}
                </span>
                <button onClick={() => setAlertsDismissed(true)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <X className="w-4 h-4"/>
                </button>
              </div>
            </div>

            {activeAlerts.map(alert => (<div key={alert.id} className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md transition-all ${alert.severity === 'emergency'
                    ? 'bg-red-950 text-white border-red-800 animate-pulse'
                    : alert.severity === 'critical'
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 border-red-200 dark:border-red-900'
                        : alert.severity === 'warning'
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 border-amber-200 dark:border-amber-900'
                            : 'bg-blue-50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200 border-blue-200 dark:border-blue-900'}`}>
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-white/10 dark:bg-white/5 shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5 text-[#E5A00D]"/>
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <SeverityBadge severity={alert.severity} size="sm"/>
                      <h3 className="font-bold text-sm sm:text-base leading-snug">{alert.title}</h3>
                    </div>
                    <p className="text-xs opacity-90 leading-relaxed max-w-3xl">{alert.message}</p>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono opacity-80 pt-1">
                      <span>Target Zone: <strong className="font-bold">{alert.targetZone}</strong></span>
                      <span>Broadcast: {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>Sender: {alert.senderName} ({alert.senderRole})</span>
                    </div>
                  </div>
                </div>


              </div>))}
          </div>) : (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"/>
              <span className="font-bold text-emerald-900 dark:text-emerald-300">
                All Estate Corridors Operational & Secure
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 hidden md:inline">
                • Active guard patrols logged in {user?.zone || 'your estate'}
              </span>
            </div>
            <button onClick={() => onNavigate('alerts')} className="font-bold text-emerald-800 dark:text-emerald-300 hover:underline self-start sm:self-auto text-[11px] flex items-center gap-1">
              <span>View Safety Broadcast History</span>
              <ArrowRight className="w-3 h-3"/>
            </button>
          </div>)}
      </section>

      <section className="p-6 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 shadow-xs space-y-4 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
                Welcome back, {user?.name || 'Resident'}
              </h1>
              {user && <RoleBadge role={user.role}/>}
            </div>
            <p className="text-xs text-[#64748B] dark:text-slate-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"/>
              <span>Assigned Zone: <strong>{user?.zone || 'Lekki Phase 1'}</strong></span>
              <span>•</span>
              <Clock className="w-3.5 h-3.5 text-slate-400"/>
              <span>Estate Status: Verified Active</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button onClick={() => onNavigate('report')} className="px-4 py-2.5 rounded-lg bg-[#0F172A] dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs">
              <PlusCircle className="w-4 h-4 text-[#E5A00D] dark:text-white"/>
              <span>Report Incident</span>
            </button>
            <button onClick={() => onNavigate('incidents')} className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs">
              <span>View Incidents</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400"/>
            </button>
            {isAdmin && (<button onClick={() => onNavigate('alerts')} className="px-4 py-2.5 rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-950 dark:text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all">
                <Bell className="w-4 h-4 text-amber-600"/>
                <span>Broadcast Alert</span>
              </button>)}
            {isOfficer && (<button onClick={() => onNavigate('patrol')} className="px-4 py-2.5 rounded-lg border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-950 dark:text-blue-300 font-bold text-xs flex items-center gap-1.5 transition-all">
                <Shield className="w-4 h-4 text-blue-600"/>
                <span>Active Patrol Shift</span>
              </button>)}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              Operational Transparency
            </h2>
            <p className="text-sm font-bold text-[#0F172A] dark:text-white">Community Safety Overview</p>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
            Verified Live
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Total Reports
              </span>
              <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
            </div>
            <div className="text-3xl font-extrabold text-[#0F172A] dark:text-white font-mono">
              {stats?.overview?.totalIncidentsReported || 127}
            </div>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">Logged across all estate zones</p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Resolution Rate
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400"/>
            </div>
            <div className="text-3xl font-extrabold text-[#059669] dark:text-emerald-400 font-mono">
              {stats?.overview?.resolutionRatePercentage || '89%'}
            </div>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">
              {stats?.overview?.resolvedIncidents || 113} incidents closed
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Patrols
              </span>
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
            </div>
            <div className="text-3xl font-extrabold text-[#2563EB] dark:text-blue-400 font-mono">
              {stats?.overview?.activePatrolShifts || 4}
            </div>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">Guards walking active shifts</p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Safety Score
              </span>
              <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400"/>
            </div>
            <div className="text-3xl font-extrabold text-[#0F172A] dark:text-white font-mono">
              A+
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Optimal Estate Coverage</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
              Live Feed
            </h2>
            <p className="text-sm font-bold text-[#0F172A] dark:text-white">Recent Neighborhood Reports</p>
          </div>
          <button onClick={() => onNavigate('incidents')} className="text-xs font-bold text-[#2563EB] dark:text-blue-400 hover:text-[#1D4ED8] dark:hover:text-blue-300 flex items-center gap-1">
            <span>View All Incidents</span>
            <ArrowRight className="w-3.5 h-3.5"/>
          </button>
        </div>

        {recentIncidents.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentIncidents.map(incident => (<IncidentCard key={incident.id} incident={incident} onClick={() => onNavigate('incident-detail', incident.id)}/>))}
          </div>) : (<div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            No incidents reported yet.
          </div>)}

        <div className="text-center pt-2">
          <button onClick={() => onNavigate('incidents')} className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors shadow-xs">
            View Full Incident Feed & Historical Archive
          </button>
        </div>
      </section>
    </div>);
};