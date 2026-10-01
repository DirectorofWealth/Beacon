import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { PriorityBadge, StatusBadge } from '../components/ui/Badge';
import { ArrowLeft, ThumbsUp, MessageSquare, MapPin, Clock, ShieldCheck, Trash2, Send, Image as ImageIcon, } from 'lucide-react';
export const IncidentDetailPage = ({ incidentId, onBack, onNavigate, }) => {
    const { user, isOfficer, isAdmin } = useAuth();
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [statusUpdating, setStatusUpdating] = useState(false);
    const [statusNotes, setStatusNotes] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('reported');
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    useEffect(() => {
        async function loadDetail() {
            setLoading(true);
            try {
                const data = await api.getIncidentById(incidentId);
                if (data) {
                    setIncident(data);
                    setSelectedStatus(data.status);
                }
            }
            catch (err) {
                console.warn('Failed to load incident detail', err);
            }
            finally {
                setLoading(false);
            }
        }
        loadDetail();
    }, [incidentId]);
    const handleUpvote = async () => {
        if (!incident)
            return;
        try {
            const updated = await api.toggleUpvote(incident.id);
            if (updated) {
                setIncident(updated);
            }
        }
        catch (err) {
            console.warn('Upvote failed', err);
        }
    };
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!incident || !commentText.trim())
            return;
        setSubmittingComment(true);
        try {
            const updated = await api.addComment(incident.id, commentText.trim());
            if (updated) {
                setIncident(updated);
                setCommentText('');
            }
        }
        catch (err) {
            console.warn('Failed to add comment', err);
        }
        finally {
            setSubmittingComment(false);
        }
    };
    const handleStatusChange = async (newStatus) => {
        if (!incident)
            return;
        setStatusUpdating(true);
        try {
            const updated = await api.updateIncidentStatus(incident.id, newStatus, user?.id, statusNotes || `Status updated to ${newStatus.replace('_', ' ')}`);
            if (updated) {
                setIncident(updated);
                setSelectedStatus(newStatus);
                setStatusNotes('');
            }
        }
        catch (err) {
            console.warn('Failed to update status', err);
        }
        finally {
            setStatusUpdating(false);
        }
    };
    const handleDelete = async () => {
        if (!incident)
            return;
        try {
            await api.deleteIncident(incident.id);
            onBack();
        }
        catch (err) {
            console.warn('Delete failed', err);
        }
    };
    if (loading) {
        return (<div className="max-w-5xl mx-auto py-12 text-center text-slate-500 dark:text-slate-400">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"/>
        <p className="text-xs">Loading incident details...</p>
      </div>);
    }
    if (!incident) {
        return (<div className="max-w-md mx-auto py-12 text-center space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Incident Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The requested safety report does not exist or has been removed.
        </p>
        <button onClick={onBack} className="px-4 py-2 bg-[#0F172A] dark:bg-blue-600 text-white text-xs font-semibold rounded-lg">
          Back to Incidents
        </button>
      </div>);
    }
    const isOwner = user?.id === incident.reportedBy.userId || user?.name === incident.reportedBy.name;
    const canDelete = isOwner || isAdmin;
    const hasUpvoted = user ? incident.upvotes?.includes(user.id) : false;
    const formatDate = (isoString) => {
        try {
            return new Date(isoString).toLocaleString([], {
                dateStyle: 'medium',
                timeStyle: 'short',
            });
        }
        catch {
            return 'Recently';
        }
    };
    return (<div className="max-w-6xl mx-auto space-y-6 pb-20">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4"/>
        <span>Back to Incidents Feed</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center justify-between gap-3">
              <PriorityBadge priority={incident.priority}/>
              <StatusBadge status={incident.status} size="md"/>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-white leading-tight">
              {incident.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] dark:text-slate-400 pt-1 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-slate-400"/>
                <span>{incident.location.zone || 'Lekki Sector'}</span>
                {incident.location.address && <span>• {incident.location.address}</span>}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-slate-400"/>
                <span>{formatDate(incident.createdAt)}</span>
              </div>
              <span>•</span>
              <span className="capitalize font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-transparent dark:border-blue-800/60">
                Category: {incident.category.replace('_', ' ')}
              </span>
            </div>

            <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
              {incident.description}
            </div>

            {incident.images && incident.images.length > 0 && (<div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4"/>
                  Attached Evidence ({incident.images.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {incident.images.map((img, idx) => (<a key={idx} href={img} target="_blank" rel="noreferrer" className="group relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video bg-slate-100 dark:bg-slate-800">
                      <img src={img} alt={`Evidence ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    </a>))}
                </div>
              </div>)}
          </div>

          <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-5 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
                Community Updates & Comments ({incident.comments?.length || 0})
              </h3>
              <span className="text-xs text-slate-400 dark:text-slate-500">Verifiable Thread</span>
            </div>

            <div className="space-y-3">
              {incident.comments && incident.comments.length > 0 ? (incident.comments.map(c => (<div key={c.id} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{c.userName}</span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {c.userRole}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">{formatDate(c.createdAt)}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{c.message}</p>
                  </div>))) : (<p className="text-xs text-slate-400 dark:text-slate-500 py-4 text-center">
                  No comments yet. Have you observed anything related to this report?
                </p>)}
            </div>

            <form onSubmit={handleAddComment} className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Add Community Confirmation or Update:
              </label>
              <div className="flex gap-2">
                <input type="text" placeholder="e.g. Security patrol reached the gate; power lines checked..." value={commentText} onChange={e => setCommentText(e.target.value)} className="flex-1 h-10 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 outline-hidden"/>
                <button type="submit" disabled={!commentText.trim() || submittingComment} className="px-4 h-10 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-colors">
                  <Send className="w-3.5 h-3.5"/>
                  <span>Post</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3 transition-colors">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Reporter Details
            </h4>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-bold text-sm">
                {incident.reportedBy.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{incident.reportedBy.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {incident.reportedBy.role ? incident.reportedBy.role.replace('_', ' ') : 'Verified Resident'}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                  Zone: {incident.reportedBy.zone || incident.location.zone || 'Lekki Phase 1'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Community Confirmation
                </h4>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {incident.confirmationsCount || incident.upvotes?.length || 0}
                </p>
              </div>
              <button onClick={handleUpvote} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs ${hasUpvoted
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'}`}>
                <ThumbsUp className={`w-4 h-4 ${hasUpvoted ? 'fill-current' : ''}`}/>
                <span>{hasUpvoted ? 'Confirmed' : 'Upvote'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Upvotes notify neighborhood patrol officers of collective urgency and help reduce false reports.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-2 transition-colors">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Assigned Patrol Officer
            </h4>
            {incident.assignedTo ? (<div className="flex items-center gap-2.5 p-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0"/>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{incident.assignedTo.name}</p>
                  <p className="text-[11px] text-blue-700 dark:text-blue-400">
                    Badge: {incident.assignedTo.badgeNumber || 'Active Dispatch'}
                  </p>
                </div>
              </div>) : (<p className="text-xs text-slate-500 dark:text-slate-400 italic">No specific officer assigned yet.</p>)}
          </div>

          {isOfficer && (<div className="bg-white dark:bg-[#0F172A] border border-blue-200 dark:border-blue-900/60 rounded-xl p-5 shadow-xs space-y-3 transition-colors">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
                  Update Incident Status
                </h4>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                  Officer / Admin
                </span>
              </div>

              <div className="space-y-2">
                <select value={selectedStatus} onChange={e => handleStatusChange(e.target.value)} disabled={statusUpdating} className="w-full h-10 px-3 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-600 outline-hidden">
                  <option value="reported">Reported</option>
                  <option value="under_review">Under Review</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="dismissed">Dismissed</option>
                </select>

                <input type="text" placeholder="Optional status notes..." value={statusNotes} onChange={e => setStatusNotes(e.target.value)} className="w-full h-8 px-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md outline-hidden text-slate-800 dark:text-white placeholder:text-slate-400"/>
              </div>
            </div>)}

          {canDelete && (<div className="bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-2 transition-colors">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Report Ownership Control
              </h4>
              {deleteConfirm ? (<div className="space-y-2 text-xs">
                  <p className="text-red-600 dark:text-red-400 font-semibold">
                    Are you sure you want to permanently delete this report?
                  </p>
                  <div className="flex gap-2">
                    <button onClick={handleDelete} className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-bold">
                      Yes, Delete
                    </button>
                    <button onClick={() => setDeleteConfirm(false)} className="flex-1 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded font-semibold">
                      Cancel
                    </button>
                  </div>
                </div>) : (<button onClick={() => setDeleteConfirm(true)} className="w-full py-2 px-3 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                  <Trash2 className="w-3.5 h-3.5"/>
                  <span>Delete Incident Report</span>
                </button>)}
            </div>)}
        </div>
      </div>
    </div>);
};