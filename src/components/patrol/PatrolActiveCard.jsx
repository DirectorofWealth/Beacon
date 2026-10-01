import React, { useState, useEffect } from 'react';
import { Shield, Clock, Plus, CheckCircle2, AlertCircle, HelpCircle, StopCircle } from 'lucide-react';
export const PatrolActiveCard = ({ shift, onLogCheckpoint, onEndPatrol, }) => {
    const [elapsed, setElapsed] = useState('00:00:00');
    useEffect(() => {
        const startMs = new Date(shift.startTime).getTime();
        const updateTimer = () => {
            const nowMs = Date.now();
            const diffSec = Math.max(0, Math.floor((nowMs - startMs) / 1000));
            const hours = String(Math.floor(diffSec / 3600)).padStart(2, '0');
            const mins = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
            const secs = String(diffSec % 60).padStart(2, '0');
            setElapsed(`${hours}:${mins}:${secs}`);
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [shift.startTime]);
    const formatStartTime = (isoString) => {
        try {
            return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        catch {
            return 'Recent';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'secure':
            case 'clear':
            case 'hazard_resolved':
                return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0"/>;
            case 'concern':
            case 'issue_noted':
                return <AlertCircle className="w-4 h-4 text-amber-600 shrink-0"/>;
            default:
                return <HelpCircle className="w-4 h-4 text-blue-600 shrink-0"/>;
        }
    };
    return (<div className="space-y-6">
      <div className="relative bg-white dark:bg-[#0F172A] border-2 border-emerald-500/80 rounded-xl p-6 shadow-sm overflow-hidden transition-colors">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"/>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"/>
            </span>
            Patrol In Progress
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Zone:</span>{' '}
            <span className="text-xs font-bold text-slate-900 dark:text-white">{shift.zone}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl px-6 border border-slate-100 dark:border-slate-700/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Elapsed Shift Time
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-[#0F172A] dark:text-white tracking-tight">
              {elapsed}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5"/>
              Shift initiated at {formatStartTime(shift.startTime)} by {shift.officerName}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button onClick={onLogCheckpoint} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-sm shadow-xs transition-colors">
              <Plus className="w-4 h-4"/>
              Log Checkpoint
            </button>
            <button onClick={onEndPatrol} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 font-semibold text-sm transition-colors">
              <StopCircle className="w-4 h-4"/>
              End Shift
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
            Checkpoints Logged ({shift.checkpoints?.length || 0})
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">Estate Digital Audit Trail</span>
        </div>

        {shift.checkpoints && shift.checkpoints.length > 0 ? (<div className="space-y-3">
            {shift.checkpoints
                .slice()
                .reverse()
                .map((chk, idx) => (<div key={chk.id || idx} className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition-all flex items-start gap-3 text-xs">
                  <div className="mt-0.5">{getStatusIcon(chk.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{chk.name}</h4>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {formatStartTime(chk.time)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="capitalize font-semibold text-slate-700 dark:text-slate-300">
                        Status: {chk.status.replace('_', ' ')}
                      </span>
                      {chk.notes && <span className="text-slate-400">•</span>}
                      {chk.notes && <p className="text-slate-600 dark:text-slate-400 italic truncate">{chk.notes}</p>}
                    </div>
                  </div>
                </div>))}
          </div>) : (<div className="py-8 text-center text-slate-500 dark:text-slate-400 text-xs">
            No checkpoints logged yet. Click &ldquo;Log Checkpoint&rdquo; to begin documenting safety coverage.
          </div>)}
      </div>
    </div>);
};