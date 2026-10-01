import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { IncidentCard } from '../components/incidents/IncidentCard';
import { IncidentFilters } from '../components/incidents/IncidentFilters';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, AlertCircle, RefreshCw } from 'lucide-react';
export const IncidentsPage = ({ onNavigate }) => {
    const { user } = useAuth();
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        category: 'all',
        priority: 'all',
        zone: 'all',
    });
    const loadIncidents = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.getIncidents(filters);
            setIncidents(data);
        }
        catch (err) {
            setError(err.message || 'Unable to load incidents');
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadIncidents();
    }, [filters]);
    const handleUpvote = async (incidentId) => {
        try {
            const updated = await api.toggleUpvote(incidentId);
            if (updated) {
                setIncidents(prev => prev.map(i => (i.id === incidentId ? updated : i)));
            }
        }
        catch (err) {
            console.warn('Upvote failed', err);
        }
    };
    const handleClearFilters = () => {
        setFilters({
            search: '',
            status: 'all',
            category: 'all',
            priority: 'all',
            zone: 'all',
        });
    };
    return (<div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
            Neighborhood Incident Feed
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
            Structured, community-verified safety reports across planned residential estates.
          </p>
        </div>

        <button onClick={() => onNavigate('report')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-xs transition-colors">
          <PlusCircle className="w-4 h-4"/>
          <span>Report Incident</span>
        </button>
      </div>

      <IncidentFilters filters={filters} onChange={setFilters} onClear={handleClearFilters} totalCount={incidents.length}/>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (<div key={i} className="p-5 rounded-lg bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 space-y-3 animate-pulse">
              <div className="flex justify-between">
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"/>
                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"/>
              </div>
              <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"/>
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded"/>
              <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-700 rounded"/>
              <div className="h-8 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded"/>
                <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"/>
              </div>
            </div>))}
        </div>) : error ? (
        <div className="p-8 text-center bg-white dark:bg-[#0F172A] rounded-xl border border-red-200 dark:border-red-900/50 space-y-3">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto"/>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Unable to load incidents</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">{error}</p>
          <button onClick={loadIncidents} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-700">
            <RefreshCw className="w-3.5 h-3.5"/>
            Retry
          </button>
        </div>) : incidents.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#0F172A] rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            🔍
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">No incidents match your filters</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keywords, priority level, or estate zone selector.
          </p>
          <button onClick={handleClearFilters} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors">
            Clear All Filters
          </button>
        </div>) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {incidents.map(incident => (<IncidentCard key={incident.id} incident={incident} onClick={() => onNavigate('incident-detail', incident.id)} onUpvote={() => handleUpvote(incident.id)} hasUpvoted={user ? incident.upvotes?.includes(user.id) : false}/>))}
        </div>)}
    </div>);
};