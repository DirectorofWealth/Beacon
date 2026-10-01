import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { NIGERIAN_ZONES } from '../lib/constants';
import { PatrolActiveCard } from '../components/patrol/PatrolActiveCard';
import { CheckpointModal } from '../components/patrol/CheckpointModal';
import { Shield, Clock, Play } from 'lucide-react';
export const PatrolPage = () => {
    const { user, isOfficer } = useAuth();
    const [shifts, setShifts] = useState([]);
    const [activeShift, setActiveShift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedZone, setSelectedZone] = useState(user?.zone || 'Oak Ridge Sector B');
    const [initialNotes, setInitialNotes] = useState('');
    const [starting, setStarting] = useState(false);
    const [checkpointModalOpen, setCheckpointModalOpen] = useState(false);
    const [endPatrolModalOpen, setEndPatrolModalOpen] = useState(false);
    const [endSummary, setEndSummary] = useState('');
    const [ending, setEnding] = useState(false);
    const loadPatrols = async () => {
        setLoading(true);
        try {
            const data = await api.getPatrols();
            setShifts(data);
            const active = data.find(s => s.status === 'active');
            setActiveShift(active || null);
        }
        catch (err) {
            console.warn('Failed to load patrols', err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadPatrols();
    }, []);
    const handleStartPatrol = async (e) => {
        e.preventDefault();
        setStarting(true);
        try {
            const newShift = await api.startPatrol(selectedZone, initialNotes);
            setActiveShift(newShift);
            setShifts(prev => [newShift, ...prev]);
            setInitialNotes('');
        }
        catch (err) {
            console.warn('Start patrol failed', err);
        }
        finally {
            setStarting(false);
        }
    };
    const handleSaveCheckpoint = async (data) => {
        if (!activeShift)
            return;
        try {
            const updated = await api.logCheckpoint(activeShift.id, data);
            if (updated) {
                setActiveShift(updated);
                setShifts(prev => prev.map(s => (s.id === activeShift.id ? updated : s)));
            }
        }
        catch (err) {
            console.warn('Checkpoint log failed', err);
        }
    };
    const handleConfirmEndPatrol = async (e) => {
        e.preventDefault();
        if (!activeShift)
            return;
        setEnding(true);
        try {
            const updated = await api.endPatrol(activeShift.id, endSummary);
            if (updated) {
                setActiveShift(null);
                setShifts(prev => prev.map(s => (s.id === activeShift.id ? updated : s)));
                setEndPatrolModalOpen(false);
                setEndSummary('');
            }
        }
        catch (err) {
            console.warn('End patrol failed', err);
        }
        finally {
            setEnding(false);
        }
    };
    if (!isOfficer) {
        return (<div className="max-w-2xl mx-auto py-12 text-center bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 transition-colors">
        <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
          <Shield className="w-6 h-6"/>
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Patrol Officer Authorization Required</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          The patrol dashboard and checkpoint engine are reserved for verified estate security officers (such as Officer Musa Danladi, Badge #BCN-042).
        </p>
        <div className="pt-2">
          <p className="text-xs text-slate-400">
            Sign in with a patrol officer account to access this dashboard.
          </p>
        </div>
      </div>);
    }
    const completedShifts = shifts.filter(s => s.status === 'completed');
    return (<div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] dark:text-white">
            Estate Patrol Operations
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
            Active shift clock-in, live elapsed tracking, and verifiable checkpoint audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 font-bold">
            Officer: {user?.name} {user?.badgeNumber ? `(${user.badgeNumber})` : ''}
          </span>
        </div>
      </div>

      {activeShift ? (<PatrolActiveCard shift={activeShift} onLogCheckpoint={() => setCheckpointModalOpen(true)} onEndPatrol={() => setEndPatrolModalOpen(true)}/>) : (
        <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-center sm:text-left transition-colors">
          <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Shield className="w-8 h-8"/>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] dark:text-white">No Active Patrol Shift</h2>
              <p className="text-xs text-[#64748B] dark:text-slate-400 max-w-lg mt-0.5">
                Start a shift to begin logging security checkpoints, perimeter sweeps, and giving residents verified visibility into active protection.
              </p>
            </div>
          </div>

          <form onSubmit={handleStartPatrol} className="space-y-4 text-xs max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                Assigned Estate Zone *
              </label>
              <select value={selectedZone} onChange={e => setSelectedZone(e.target.value)} className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-600 outline-hidden">
                {NIGERIAN_ZONES.filter(z => z !== 'All Zones').map(z => (<option key={z} value={z}>
                    {z}
                  </option>))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                Shift Brief / Initial Notes (Optional)
              </label>
              <textarea rows={2} placeholder="e.g. Commencing evening perimeter sweep, inspecting service gates and fence energizers..." value={initialNotes} onChange={e => setInitialNotes(e.target.value)} className="w-full p-3 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-hidden resize-none"/>
            </div>

            <button type="submit" disabled={starting} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm rounded-lg shadow-md transition-colors disabled:opacity-50">
              <Play className="w-4 h-4 fill-current"/>
              <span>{starting ? 'Initiating Shift...' : 'Start Patrol Shift'}</span>
            </button>
          </form>
        </div>)}

      <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4 transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400"/>
            Recent Patrol Shift History
          </h3>
          <span className="text-xs text-slate-400">Digital Archive</span>
        </div>

        {completedShifts.length > 0 ? (<div className="space-y-3">
            {completedShifts.map(shift => (<div key={shift.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{shift.zone}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                      Completed
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {new Date(shift.startTime).toLocaleDateString([], {
                    month: 'short',
                    day: 'numeric',
                })}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 text-[11px]">
                  <span>Officer: <strong className="text-slate-800 dark:text-slate-200">{shift.officerName}</strong></span>
                  <span>•</span>
                  <span>Checkpoints Logged: <strong className="text-slate-800 dark:text-slate-200">{shift.checkpoints?.length || 0}</strong></span>
                </div>

                {shift.summary && (<p className="text-slate-700 dark:text-slate-300 italic bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 mt-1">
                    &ldquo;{shift.summary}&rdquo;
                  </p>)}
              </div>))}
          </div>) : (<p className="text-xs text-slate-400 py-4 text-center">
            No past patrol shifts recorded yet.
          </p>)}
      </div>

      <CheckpointModal isOpen={checkpointModalOpen} onClose={() => setCheckpointModalOpen(false)} onSave={handleSaveCheckpoint}/>

      {endPatrolModalOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#0F172A] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 animate-fadeIn text-xs transition-colors">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Conclude Patrol Shift</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Are you ready to conclude your shift in <strong>{activeShift?.zone}</strong>? Provide a brief summary of neighborhood coverage for estate records.
            </p>
            <form onSubmit={handleConfirmEndPatrol} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Shift Summary & Remarks *
                </label>
                <textarea rows={3} required placeholder="e.g. All 4 gates cleared, back perimeter fences intact, no anomalies." value={endSummary} onChange={e => setEndSummary(e.target.value)} className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 outline-hidden focus:ring-2 focus:ring-blue-600"/>
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEndPatrolModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  Cancel
                </button>
                <button type="submit" disabled={ending} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg disabled:opacity-50">
                  {ending ? 'Ending Shift...' : 'Conclude & Archive Shift'}
                </button>
              </div>
            </form>
          </div>
        </div>)}
    </div>);
};