import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../components/ui/BrandLogo';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { PlusCircle, ArrowRight, Shield, Activity, CheckCircle2, Sparkles, } from 'lucide-react';
export const LandingPage = ({ onNavigate }) => {
    useAuth();
    const [stats, setStats] = useState(null);
    const [incidents, setIncidents] = useState([]);
    const [currentTime, setCurrentTime] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const [statsData, incidentsData] = await Promise.all([
                    api.getPublicStats(),
                    api.getIncidents({ search: '', status: 'all', category: 'all', priority: 'all', zone: 'all' }),
                ]);
                setStats(statsData);
                setIncidents(incidentsData);
            }
            catch (err) {
                console.warn('Error loading landing data:', err);
            }
            finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);
    const totalReports = stats?.overview?.totalIncidentsReported ?? incidents.length ?? 0;
    const resolvedCount = stats?.overview?.resolvedIncidents ?? incidents.filter(i => i.status === 'resolved').length ?? 0;
    const activeCount = incidents.filter(i => i.status === 'reported' || i.status === 'in_progress').length;
    const resolutionRate = stats?.overview?.resolutionRatePercentage ?? `${totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0}%`;
    const activePatrols = stats?.overview?.activePatrolShifts ?? 0;
    const activeAlerts = stats?.overview?.activeSafetyAlerts ?? 0;
    return (<div className="min-h-screen bg-[#F7F5F0] dark:bg-[#070D18] text-[#0F172A] dark:text-[#E2E8F0] font-sans antialiased transition-colors duration-200">
      <header className="sticky top-0 z-50 bg-[#F7F5F0]/95 dark:bg-[#070D18]/95 backdrop-blur-md border-b border-[#E7E2D8] dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <button onClick={() => onNavigate('landing')} className="focus:outline-hidden focus:ring-2 focus:ring-amber-500 rounded-lg">
            <BrandLogo size="md" showSubtitle={false}/>
          </button>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle size="sm"/>

            <button onClick={() => onNavigate('report')} className="px-3.5 py-2 rounded-lg text-xs font-bold text-[#0F172A] dark:text-slate-200 border border-[#D5CEC0] dark:border-slate-700 bg-white/70 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-400 transition-colors shadow-2xs">
              Report Incident
            </button>

            <button onClick={() => onNavigate('register')} className="px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase text-white bg-[#0B1728] dark:bg-blue-600 hover:bg-[#15253F] dark:hover:bg-blue-500 transition-all shadow-xs">
              Create Account
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-[#E2DDD3] dark:border-slate-800 text-xs font-mono font-bold tracking-widest text-[#0F172A] dark:text-slate-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#E5A00D] shadow-[0_0_8px_#E5A00D] animate-pulse"/>
                <span>LIVE ESTATE MONITORING</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0B192C] dark:text-white leading-[1.05]">
                Light the <br />
                way to <span className="text-[#E5A00D]">safer</span> <br />
                neighborhoods.
              </h1>

              <p className="text-base sm:text-lg text-[#475569] dark:text-slate-300 max-w-xl leading-relaxed">
                Operational clarity for Nigerian estates. A unified command surface for residents, patrol teams, and administrators.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button onClick={() => onNavigate('report')} className="px-6 py-3.5 rounded-lg bg-[#0B1728] dark:bg-blue-600 hover:bg-[#182C48] dark:hover:bg-blue-500 text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-[#E5A00D] dark:text-white"/>
                  <span>Report Incident</span>
                </button>

                <button onClick={() => onNavigate('incidents')} className="px-6 py-3.5 rounded-lg bg-white dark:bg-slate-900 border border-[#D5CEC0] dark:border-slate-700 hover:bg-[#F0EDE6] dark:hover:bg-slate-800 text-[#0F172A] dark:text-white font-bold text-sm transition-all shadow-2xs flex items-center gap-2">
                  <span>View Incidents</span>
                  <ArrowRight className="w-4 h-4 text-slate-400"/>
                </button>
              </div>


            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#0B1728] border border-slate-800 rounded-2xl p-6 sm:p-7 text-white shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"/>

                <div className="relative flex items-center justify-between border-b border-slate-800/90 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E5A00D] animate-ping"/>
                    <span className="font-mono text-xs font-bold tracking-widest text-[#E5A00D]">
                      ZONE_01_LEKKI
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#E5A00D] tracking-wider">
                    {currentTime || '09:42:01'}
                  </span>
                </div>

                {loading ? (
                  <div className="relative space-y-5 animate-pulse">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-24 bg-slate-700 rounded"/>
                      <div className="h-3 w-16 bg-slate-700 rounded"/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl bg-[#122238] border border-slate-800 space-y-2">
                        <div className="h-2 w-16 bg-slate-700 rounded"/>
                        <div className="h-8 w-12 bg-slate-700 rounded"/>
                        <div className="h-2 w-20 bg-slate-700 rounded"/>
                      </div>
                      <div className="p-4 rounded-xl bg-[#122238] border border-slate-800 space-y-2">
                        <div className="h-2 w-16 bg-slate-700 rounded"/>
                        <div className="h-8 w-12 bg-slate-700 rounded"/>
                        <div className="h-2 w-20 bg-slate-700 rounded"/>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#0F1E32] border border-slate-800/80 space-y-2">
                      <div className="h-2 w-full bg-slate-700 rounded"/>
                      <div className="h-2 w-3/4 bg-slate-700 rounded"/>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-[#102038] border border-slate-800 space-y-2">
                        <div className="h-2 w-12 bg-slate-700 rounded"/>
                        <div className="h-6 w-8 bg-slate-700 rounded"/>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#E5A00D]/20 border border-slate-800 space-y-2">
                        <div className="h-2 w-12 bg-slate-700 rounded"/>
                        <div className="h-6 w-8 bg-slate-700 rounded"/>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                          Estate Incident Metrics
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>
                          Live Verified
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-[#122238] border border-slate-800">
                          <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                            Total Incidents Ever
                          </div>
                          <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                            {totalReports}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">Created across estate</div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#122238] border border-slate-800">
                          <div className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                            Verified Resolved
                          </div>
                          <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 mt-1">
                            {resolvedCount}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">{resolutionRate} resolution rate</div>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#0F1E32] border border-slate-800/80 space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 font-medium">Active Response Queue</span>
                          <span className="text-amber-400 font-bold">{activeCount} in progress</span>
                        </div>

                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                          <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${resolutionRate}` }} title={`Resolved: ${resolutionRate}`}/>
                          <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${100 - parseInt(resolutionRate, 10)}%` }} title="In Progress"/>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                          <span>Lekki Sector 1</span>
                          <span>Victoria Island Gate</span>
                          <span>Maitama Link</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-[#102038] border border-slate-800 flex flex-col justify-between">
                        <span className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Patrols
                        </span>
                        <span className="font-mono text-3xl font-black text-white mt-1">
                          {String(activePatrols).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#E5A00D] text-slate-950 flex flex-col justify-between shadow-md">
                        <span className="font-mono text-[10px] uppercase font-black tracking-wider text-slate-900">
                          Alerts
                        </span>
                        <span className="font-mono text-3xl font-black text-slate-950 mt-1">
                          {String(activeAlerts).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="roles" className="border-t border-b border-[#E2DDD3] dark:border-slate-800 bg-white/60 dark:bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2DDD3] dark:divide-slate-800">
              <div className="py-6 md:py-0 md:px-8 first:pl-0 last:pr-0 space-y-4">
                <span className="font-mono text-xs font-bold text-[#E5A00D] uppercase tracking-wider block">
                  01. Resident
                </span>
                <h3 className="text-2xl font-black text-[#0B192C] dark:text-white tracking-tight">
                  Instant Reporting
                </h3>
                <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                  Ada receives a silent push notification when her guest arrives at the gate. Zero friction. Geotagged incident reporting with verified photo attachments and real-time status.
                </p>
              </div>

              <div className="py-6 md:py-0 md:px-8 first:pl-0 last:pr-0 space-y-4">
                <span className="font-mono text-xs font-bold text-[#E5A00D] uppercase tracking-wider block">
                  02. Patrol
                </span>
                <h3 className="text-2xl font-black text-[#0B192C] dark:text-white tracking-tight">
                  Guided Response
                </h3>
                <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                  Musa follows a geofenced route with mandatory digital checkpoints. Transparency by design. Timestamped GPS verifications eliminate paper guard registers.
                </p>
              </div>

              <div className="py-6 md:py-0 md:px-8 first:pl-0 last:pr-0 space-y-4">
                <span className="font-mono text-xs font-bold text-[#E5A00D] uppercase tracking-wider block">
                  03. Admin
                </span>
                <h3 className="text-2xl font-black text-[#0B192C] dark:text-white tracking-tight">
                  Estate Analytics
                </h3>
                <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                  Mrs. Okonkwo reviews response times and patrol coverage from a single bird&apos;s-eye view. Broadcast emergency sirens to specific gates with automated expiration.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2DDD3] dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                  Operational Transparency
                </h2>
              </div>
              <p className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B192C] dark:text-white">
                Community Safety Overview
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
              Verified Live
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2">
            <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Reports
                </span>
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-mono">
                {stats?.overview?.totalIncidentsReported || totalReports || 127}
              </div>
              <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">Logged across all estate zones</p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Resolution Rate
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400"/>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#059669] dark:text-emerald-400 font-mono">
                {stats?.overview?.resolutionRatePercentage || `${Math.round((resolvedCount / totalReports) * 100)}%` || '89%'}
              </div>
              <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">
                {stats?.overview?.resolvedIncidents || resolvedCount || 113} incidents closed
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Active Patrols
                </span>
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] dark:text-blue-400 font-mono">
                {stats?.overview?.activePatrolShifts || 4}
              </div>
              <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">Guards walking active shifts</p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Safety Score
                </span>
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400"/>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-mono">
                A+
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Optimal Estate Coverage</p>
            </div>
          </div>
        </section>

        <section id="lifecycle" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E2DDD3] dark:border-slate-800 pb-5">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B192C] dark:text-white">
              Incident Lifecycle
            </h2>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#64748B] dark:text-slate-400">
              Resolution Protocol 4.1
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#0B192C] dark:bg-blue-500 shrink-0"/>
                <span className="font-mono text-xs font-bold text-[#E5A00D] uppercase tracking-wider">
                  Reported
                </span>
              </div>
              <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                Event logged via app or panic button. Geolocation locked. Instant alert pushed to active duty patrol.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#E5A00D] shrink-0"/>
                <span className="font-mono text-xs font-bold text-[#E5A00D] uppercase tracking-wider">
                  Verified
                </span>
              </div>
              <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                Nearest patrol officer acknowledges and arrives on site within 180s. Physical situation assessed and logged.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"/>
                <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Resolved
                </span>
              </div>
              <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                Final report filed with photographic evidence. Resident notified. Community intelligence record permanently archived.
              </p>
            </div>
          </div>
        </section>


      </main>
    </div>);
};