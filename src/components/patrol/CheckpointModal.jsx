import React, { useState } from 'react';
import { X, MapPin, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
export const CheckpointModal = ({ isOpen, onClose, onSave, }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('secure');
    const [notes, setNotes] = useState('');
    if (!isOpen)
        return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim())
            return;
        onSave({ name: name.trim(), status, notes: notes.trim() });
        setName('');
        setNotes('');
        onClose();
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white dark:bg-[#0F172A] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn transition-colors" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Log Patrol Checkpoint</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md">
            <X className="w-4 h-4"/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Checkpoint Location / Name *
            </label>
            <input type="text" placeholder="e.g. Main Gate Access, Block C Fence, Children Park" value={name} onChange={e => setName(e.target.value)} required className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-hidden"/>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Checkpoint Status *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${status === 'secure'
            ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 font-semibold'
            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <input type="radio" name="status" value="secure" checked={status === 'secure'} onChange={() => setStatus('secure')} className="sr-only"/>
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400"/>
                <span>Secure (No issues)</span>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${status === 'check'
            ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/50 text-blue-900 dark:text-blue-300 font-semibold'
            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <input type="radio" name="status" value="check" checked={status === 'check'} onChange={() => setStatus('check')} className="sr-only"/>
                <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
                <span>Routine Check</span>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${status === 'concern'
            ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 font-semibold'
            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <input type="radio" name="status" value="concern" checked={status === 'concern'} onChange={() => setStatus('concern')} className="sr-only"/>
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400"/>
                <span>Concern / Caution</span>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${status === 'other'
            ? 'border-slate-400 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-semibold'
            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <input type="radio" name="status" value="other" checked={status === 'other'} onChange={() => setStatus('other')} className="sr-only"/>
                <span className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center text-[10px]">•</span>
                <span>Other Observation</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Field Observations / Notes (Optional)
            </label>
            <textarea rows={3} placeholder="e.g., Gate locks checked, floodlight timer inspected, guard handover verified." value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-hidden resize-none"/>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              Cancel
            </button>
            <button type="submit" disabled={!name.trim()} className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg disabled:opacity-50">
              Save Checkpoint
            </button>
          </div>
        </form>
      </div>
    </div>);
};