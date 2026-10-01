import React, { useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { NIGERIAN_ZONES } from '../lib/constants';
import { ArrowLeft, MapPin, Camera, X, AlertCircle, CheckCircle2, Bookmark, Send, } from 'lucide-react';
export const ReportIncidentPage = ({ onBack, onSuccess, }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('suspicious_activity');
    const [priority, setPriority] = useState('medium');
    const [zone, setZone] = useState(user?.zone || 'Lekki Phase 1');
    const [address, setAddress] = useState('');
    const [images, setImages] = useState([
        'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    ]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [draftSaved, setDraftSaved] = useState(false);
    const handleAutofillLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                setAddress(`Estate GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
            }, () => {
                setAddress('Service Gate 1, Main Avenue Corner');
            });
        }
        else {
            setAddress('Service Gate 1, Main Avenue Corner');
        }
    };
    const handleAddSamplePhoto = () => {
        if (images.length >= 5)
            return;
        const samplePhotos = [
            'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
        ];
        const nextImg = samplePhotos[images.length % samplePhotos.length];
        setImages(prev => [...prev, nextImg]);
    };
    const handleRemovePhoto = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };
    const handleSaveDraft = () => {
        localStorage.setItem('beacon_incident_draft', JSON.stringify({ title, description, category, priority, zone, address }));
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 3000);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            setError('Please provide both a descriptive title and incident explanation.');
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            const newIncident = await api.createIncident({
                title: title.trim(),
                description: description.trim(),
                category,
                priority,
                location: {
                    zone,
                    address: address.trim() || undefined,
                },
                images,
            });
            onSuccess(newIncident.id);
        }
        catch (err) {
            setError(err.message || 'Failed to submit incident report');
            setSubmitting(false);
        }
    };
    return (<div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4"/>
          <span>Cancel & Back</span>
        </button>

        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Role: <strong className="text-slate-900 dark:text-white">{user?.role || 'Resident'}</strong>
        </span>
      </div>

      <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 transition-colors">
        <div>
          <h1 className="text-xl font-extrabold text-[#0F172A] dark:text-white">File Incident Report</h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">
            Submit a structured report to notify estate security officers and neighborhood administrators.
          </p>
        </div>

        {error && (<div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0"/>
            <span>{error}</span>
          </div>)}

        {draftSaved && (<div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0"/>
            <span>Draft saved to local browser storage.</span>
          </div>)}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-200 mb-1">
              Title *
            </label>
            <input type="text" placeholder="e.g. Unregistered vehicle idling near playground" value={title} onChange={e => setTitle(e.target.value)} required className="w-full h-11 px-4 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-lg text-sm text-[#1E293B] dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-hidden"/>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">
              Short, descriptive summary of the safety concern.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-200 mb-1">
              Description *
            </label>
            <textarea rows={4} placeholder="What happened? Include details like time, people involved, vehicle plates, or physical descriptions..." value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-3.5 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-lg text-xs text-[#1E293B] dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-hidden resize-none leading-relaxed"/>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-200 mb-1">
              Category *
            </label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-lg text-xs text-[#1E293B] dark:text-white font-medium focus:ring-2 focus:ring-[#2563EB] outline-hidden">
              <option value="suspicious_activity">Suspicious Activity</option>
              <option value="theft">Theft / Burglary</option>
              <option value="vandalism">Vandalism</option>
              <option value="hazard">Hazard / Utilities Issue</option>
              <option value="lost_and_found">Lost and Found</option>
              <option value="noise_complaint">Noise Complaint</option>
              <option value="emergency">Emergency / Intrusion</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-200 mb-1.5">
              Priority Level *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${priority === 'low'
            ? 'border-slate-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" name="priority" value="low" checked={priority === 'low'} onChange={() => setPriority('low')} className="sr-only"/>
                <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]"/>
                <span>Low</span>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${priority === 'medium'
            ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 font-bold'
            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" name="priority" value="medium" checked={priority === 'medium'} onChange={() => setPriority('medium')} className="sr-only"/>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]"/>
                <span>Medium</span>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${priority === 'high'
            ? 'border-red-500 bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-300 font-bold'
            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" name="priority" value="high" checked={priority === 'high'} onChange={() => setPriority('high')} className="sr-only"/>
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"/>
                <span>High</span>
              </label>

              <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${priority === 'critical'
            ? 'border-red-900 bg-red-100 dark:bg-red-950/80 text-[#7F1D1D] dark:text-red-200 font-extrabold'
            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <input type="radio" name="priority" value="critical" checked={priority === 'critical'} onChange={() => setPriority('critical')} className="sr-only"/>
                <span className="w-2.5 h-2.5 rounded-full bg-[#7F1D1D] animate-ping"/>
                <span>CRITICAL</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-200 mb-1">
                Estate Zone *
              </label>
              <select value={zone} onChange={e => setZone(e.target.value)} className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-lg text-xs text-[#1E293B] dark:text-white font-medium focus:ring-2 focus:ring-[#2563EB] outline-hidden truncate">
                {NIGERIAN_ZONES.filter(z => z !== 'All Zones').map(z => (<option key={z} value={z}>
                    {z}
                  </option>))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-200">
                  Specific Address / Landmark *
                </label>
                <button type="button" onClick={handleAutofillLocation} className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 flex items-center gap-1">
                  <MapPin className="w-3 h-3"/>
                  Use current location
                </button>
              </div>
              <input type="text" placeholder="e.g. Block C, Plot 14, Admiralty Way" value={address} onChange={e => setAddress(e.target.value)} className="w-full h-11 px-3.5 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-lg text-xs text-[#1E293B] dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#2563EB] outline-hidden"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-200">
                Photos (Optional, max 5)
              </label>
              {images.length < 5 && (<button type="button" onClick={handleAddSamplePhoto} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5"/>
                  + Add Photo Evidence
                </button>)}
            </div>

            {images.length > 0 && (<div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-1">
                {images.map((img, idx) => (<div key={idx} className="relative aspect-square rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden group bg-slate-100 dark:bg-slate-800">
                    <img src={img} alt="Evidence preview" className="w-full h-full object-cover"/>
                    <button type="button" onClick={() => handleRemovePhoto(idx)} className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full hover:bg-red-600 transition-colors" title="Remove image">
                      <X className="w-3 h-3"/>
                    </button>
                  </div>))}
              </div>)}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <button type="submit" disabled={submitting} className="w-full h-12 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
              <Send className="w-4 h-4"/>
              <span>{submitting ? 'Submitting Report...' : 'Submit Report'}</span>
            </button>

            <div className="text-center">
              <button type="button" onClick={handleSaveDraft} className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5"/>
                <span>Save Draft Locally</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>);
};