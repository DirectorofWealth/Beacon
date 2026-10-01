import React, { useState } from 'react';
import { NIGERIAN_ZONES } from '../../lib/constants';
import { Search, Filter, RotateCcw, X } from 'lucide-react';
export const IncidentFilters = ({ filters, onChange, onClear, totalCount, }) => {
    const [mobileExpanded, setMobileExpanded] = useState(false);
    const hasActiveFilters = filters.search !== '' ||
        filters.status !== 'all' ||
        filters.category !== 'all' ||
        filters.priority !== 'all' ||
        (filters.zone !== 'all' && filters.zone !== 'All Zones');
    return (<div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3 transition-colors">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"/>
          <input type="text" placeholder="Search reports by title, street, or description..." value={filters.search} onChange={e => onChange({ ...filters, search: e.target.value })} className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 rounded-lg focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-hidden transition-all text-[#1E293B] dark:text-slate-100 placeholder:text-slate-400"/>
          {filters.search && (<button onClick={() => onChange({ ...filters, search: '' })} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
              <X className="w-3.5 h-3.5"/>
            </button>)}
        </div>

        <button onClick={() => setMobileExpanded(!mobileExpanded)} className="sm:hidden w-full h-11 px-4 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700">
          <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
          <span>{mobileExpanded ? 'Hide Filters' : 'Refine Filters'}</span>
          {hasActiveFilters && (<span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"/>)}
        </button>
      </div>

      <div className={`${mobileExpanded ? 'grid' : 'hidden'} sm:grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800`}>
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400 mb-1">
            Status
          </label>
          <select value={filters.status} onChange={e => onChange({ ...filters, status: e.target.value })} className="w-full h-9 px-2.5 text-xs bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-md text-[#1E293B] dark:text-slate-200 font-medium focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-hidden">
            <option value="all">All Statuses</option>
            <option value="reported">Reported</option>
            <option value="under_review">Under Review</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400 mb-1">
            Priority
          </label>
          <select value={filters.priority} onChange={e => onChange({ ...filters, priority: e.target.value })} className="w-full h-9 px-2.5 text-xs bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-md text-[#1E293B] dark:text-slate-200 font-medium focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-hidden">
            <option value="all">All Priorities</option>
            <option value="low">Low (Routine)</option>
            <option value="medium">Medium (Caution)</option>
            <option value="high">High (Urgent)</option>
            <option value="critical">Critical (Immediate)</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400 mb-1">
            Category
          </label>
          <select value={filters.category} onChange={e => onChange({ ...filters, category: e.target.value })} className="w-full h-9 px-2.5 text-xs bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-md text-[#1E293B] dark:text-slate-200 font-medium focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-hidden">
            <option value="all">All Categories</option>
            <option value="theft">Theft</option>
            <option value="vandalism">Vandalism</option>
            <option value="suspicious_activity">Suspicious Activity</option>
            <option value="hazard">Hazard & Utilities</option>
            <option value="lost_and_found">Lost & Found</option>
            <option value="noise_complaint">Noise Complaint</option>
            <option value="emergency">Emergency / Intrusion</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400 mb-1">
            Estate Zone
          </label>
          <select value={filters.zone} onChange={e => onChange({ ...filters, zone: e.target.value })} className="w-full h-9 px-2.5 text-xs bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-md text-[#1E293B] dark:text-slate-200 font-medium focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-hidden truncate">
            <option value="all">All Estate Zones</option>
            {NIGERIAN_ZONES.filter(z => z !== 'All Zones').map(z => (<option key={z} value={z}>
                {z}
              </option>))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-[#64748B] dark:text-slate-400">
        <span>
          Showing <strong className="text-slate-800 dark:text-slate-200">{totalCount}</strong> verified reports
        </span>

        {hasActiveFilters && (<button onClick={onClear} className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] dark:text-blue-400 hover:text-[#1D4ED8] dark:hover:text-blue-300 transition-colors">
            <RotateCcw className="w-3.5 h-3.5"/>
            Clear Filters
          </button>)}
      </div>
    </div>);
};