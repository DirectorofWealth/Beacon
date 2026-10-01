import React from 'react';
export const StatusBadge = ({ status, size = 'md' }) => {
    const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';
    switch (status) {
        case 'reported':
            return (<span className={`inline-flex items-center rounded-md border border-[#64748B] text-[#64748B] bg-white font-medium ${sizeClasses}`}>
          Reported
        </span>);
        case 'under_review':
            return (<span className={`inline-flex items-center rounded-md border border-[#D97706] text-[#D97706] bg-amber-50/50 font-medium ${sizeClasses}`}>
          Under Review
        </span>);
        case 'in_progress':
            return (<span className={`inline-flex items-center rounded-md bg-[#2563EB] text-white font-semibold ${sizeClasses}`}>
          In Progress
        </span>);
        case 'resolved':
            return (<span className={`inline-flex items-center rounded-md bg-[#059669] text-white font-semibold ${sizeClasses}`}>
          Resolved
        </span>);
        case 'dismissed':
            return (<span className={`inline-flex items-center rounded-md bg-[#94A3B8] text-white font-medium ${sizeClasses}`}>
          Dismissed
        </span>);
        default:
            return (<span className={`inline-flex items-center rounded-md bg-slate-100 text-slate-700 ${sizeClasses}`}>
          {status}
        </span>);
    }
};
export const PriorityBadge = ({ priority, showLabel = true }) => {
    switch (priority) {
        case 'low':
            return (<span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0"/>
          {showLabel && <span>Low Severity</span>}
        </span>);
        case 'medium':
            return (<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0"/>
          {showLabel && <span>Medium Severity</span>}
        </span>);
        case 'high':
            return (<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
          <span className="h-2 w-2 rounded-full bg-red-600 shrink-0"/>
          {showLabel && <span>High Severity</span>}
        </span>);
        case 'critical':
            return (<span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded border border-red-200 dark:border-red-800">
          <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse shrink-0"/>
          {showLabel && <span>Critical Severity</span>}
        </span>);
        default:
            return null;
    }
};
export const SeverityBadge = ({ severity, size = 'md' }) => {
    const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';
    switch (severity) {
        case 'info':
            return (<span className={`inline-flex items-center gap-1 font-semibold uppercase tracking-wider rounded text-white bg-[#0284C7] ${sizeClasses}`}>
          Info
        </span>);
        case 'warning':
            return (<span className={`inline-flex items-center gap-1 font-semibold uppercase tracking-wider rounded text-white bg-[#D97706] ${sizeClasses}`}>
          Warning
        </span>);
        case 'critical':
            return (<span className={`inline-flex items-center gap-1 font-bold uppercase tracking-wider rounded text-white bg-[#DC2626] ${sizeClasses}`}>
          Critical
        </span>);
        case 'emergency':
            return (<span className={`inline-flex items-center gap-1.5 font-extrabold uppercase tracking-widest rounded text-white bg-[#7F1D1D] shadow-sm relative overflow-hidden ${sizeClasses}`}>
          <span className="h-2 w-2 rounded-full bg-white animate-ping"/>
          Emergency
        </span>);
        default:
            return null;
    }
};
export const RoleBadge = ({ role }) => {
    switch (role) {
        case 'admin':
            return (<span className="inline-flex items-center gap-1 rounded bg-[#0F172A] text-white text-xs px-2.5 py-0.5 font-semibold">
          Estate Admin
        </span>);
        case 'patrol_officer':
            return (<span className="inline-flex items-center gap-1 rounded bg-[#2563EB] text-white text-xs px-2.5 py-0.5 font-semibold">
          Patrol Officer
        </span>);
        case 'resident':
            return (<span className="inline-flex items-center gap-1 rounded border border-[#E2E8F0] bg-slate-100 text-[#1E293B] text-xs px-2.5 py-0.5 font-medium">
          Resident
        </span>);
        default:
            return null;
    }
};
