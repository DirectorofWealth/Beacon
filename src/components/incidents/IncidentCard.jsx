import React from 'react';
import { PriorityBadge, StatusBadge } from '../ui/Badge';
import { ThumbsUp, MessageSquare, MapPin, Clock, ShieldCheck } from 'lucide-react';
export const IncidentCard = ({ incident, onClick, onUpvote, hasUpvoted = false, }) => {
    const priorityBorderClass = {
        low: 'border-l-4 border-l-[#64748B]',
        medium: 'border-l-4 border-l-[#D97706]',
        high: 'border-l-4 border-l-[#DC2626]',
        critical: 'border-l-4 border-l-[#7F1D1D]',
    }[incident.priority] || 'border-l-4 border-l-[#64748B]';
    const formatTimeAgo = (isoString) => {
        try {
            const diffMs = Date.now() - new Date(isoString).getTime();
            const diffMins = Math.floor(diffMs / (1000 * 60));
            if (diffMins < 1)
                return 'Just now';
            if (diffMins < 60)
                return `${diffMins}m ago`;
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours < 24)
                return `${diffHours}h ago`;
            const diffDays = Math.floor(diffHours / 24);
            return `${diffDays}d ago`;
        }
        catch {
            return 'Recently';
        }
    };
    return (<div onClick={onClick} className={`group bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 ${priorityBorderClass} rounded-lg p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <PriorityBadge priority={incident.priority}/>
          <StatusBadge status={incident.status} size="sm"/>
        </div>

        <h3 className="font-bold text-sm text-[#1E293B] dark:text-slate-100 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-1.5">
          {incident.title}
        </h3>

        <p className="text-xs text-[#64748B] dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {incident.description}
        </p>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-[#64748B] dark:text-slate-400">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0"/>
            <span className="truncate font-medium text-slate-700 dark:text-slate-300">
              {incident.location.zone || 'Lekki Sector'} {incident.location.address ? `• ${incident.location.address}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 shrink-0">
            <Clock className="w-3 h-3"/>
            <span>{formatTimeAgo(incident.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button onClick={e => {
            e.stopPropagation();
            onUpvote?.(e);
        }} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${hasUpvoted
            ? 'bg-blue-100 dark:bg-blue-900/50 text-[#2563EB] dark:text-blue-400 border border-blue-200 dark:border-blue-700'
            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`} title="Confirm / Upvote Incident">
              <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-current' : ''}`}/>
              <span>{incident.confirmationsCount || incident.upvotes?.length || 0}</span>
            </button>

            <div className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 px-2 py-1 text-xs">
              <MessageSquare className="w-3.5 h-3.5"/>
              <span>{incident.comments?.length || 0}</span>
            </div>
          </div>

          {incident.assignedTo && (<div className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800" title={`Assigned to ${incident.assignedTo.name}`}>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"/>
              <span className="truncate max-w-[100px]">{incident.assignedTo.name}</span>
            </div>)}
        </div>
      </div>
    </div>);
};