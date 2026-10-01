import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { RoleBadge } from '../components/ui/Badge';
import { NIGERIAN_ZONES } from '../lib/constants';
import { MapPin, Mail, CheckCircle2, Camera, Pencil, X, Save, User } from 'lucide-react';

export const ProfilePage = ({ onOpenDocs }) => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [zone, setZone] = useState(user?.zone || 'Lekki Phase 1');
    const [avatar, setAvatar] = useState(user?.avatar || null);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    if (!user) {
        return (<div className="max-w-md mx-auto py-12 text-center text-slate-500 text-xs">
        Please sign in to view your estate profile.
      </div>);
    }

    const handleStartEdit = () => {
        setName(user.name || '');
        setPhone(user.phone || '');
        setZone(user.zone || 'Lekki Phase 1');
        setAvatar(user.avatar || null);
        setIsEditing(true);
        setError(null);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setError(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setError('Image must be less than 2MB');
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            setAvatar(ev.target?.result || null);
            setError(null);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            const updates = { name, phone, zone };
            if (avatar && avatar !== user.avatar) {
                updates.avatar = avatar;
            }
            await updateProfile(updates);
            setSaved(true);
            setIsEditing(false);
            setTimeout(() => setSaved(false), 4000);
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const displayAvatar = avatar || user.avatar;
    const initial = user.name?.charAt(0)?.toUpperCase() || <User className="w-8 h-8" />;

    return (<div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] dark:text-white">My Profile</h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
            Manage your estate credentials and contact information.
          </p>
        </div>
        {!isEditing && (
          <button onClick={handleStartEdit} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors shadow-xs">
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {saved && (<div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Profile updated successfully.</span>
        </div>)}

      {error && (<div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-800 dark:text-red-300 flex items-center gap-2">
          <X className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
          <span>{error}</span>
        </div>)}

      <div className="bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden transition-colors">
        <div className="relative bg-gradient-to-br from-[#0F172A] to-[#1E293B] dark:from-slate-800 dark:to-slate-900 p-8 flex flex-col items-center">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center overflow-hidden">
              {displayAvatar ? (
                <img src={displayAvatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-extrabold text-white">{initial}</span>
              )}
            </div>
            {isEditing && (
              <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center shadow-lg transition-colors" title="Change photo">
                <Camera className="w-4 h-4" />
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>
          {isEditing && (
            <p className="text-[11px] text-slate-400 mt-3">Click the camera icon to upload a photo (max 2MB)</p>
          )}
        </div>

        <div className="p-6 sm:p-8">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                <RoleBadge role={user.role} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{user.zone}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400 text-xs font-mono">Phone:</span>
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.badgeNumber && (
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400 text-xs font-mono">Badge:</span>
                    <span className="font-mono font-bold">{user.badgeNumber}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Member since {new Date(user.createdAt).toLocaleDateString([], { month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Full Name
                </label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full h-11 px-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-blue-600" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Phone Number
                </label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full h-11 px-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-blue-600" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Estate Zone
                </label>
                <select value={zone} onChange={e => setZone(e.target.value)} className="w-full h-11 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white font-semibold outline-hidden focus:ring-2 focus:ring-blue-600">
                  {NIGERIAN_ZONES.filter(z => z !== 'All Zones').map(z => (<option key={z} value={z}>
                      {z}
                    </option>))}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-lg shadow-xs transition-colors disabled:opacity-50">
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button type="button" onClick={handleCancelEdit} className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>);
};