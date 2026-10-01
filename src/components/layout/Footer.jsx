import React from 'react';
import { BrandLogo } from '../ui/BrandLogo';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Shield, PhoneCall, MapPin, Layers } from 'lucide-react';
export const Footer = ({onNavigate }) => {
    return (<footer className="bg-white dark:bg-[#0F172A] border-t border-[#E2E8F0] dark:border-slate-800 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-2">
            <BrandLogo size="md"/>
            <p className="text-xs text-[#64748B] dark:text-slate-400 max-w-md leading-relaxed">
              <strong>Light the way to safer neighborhoods.</strong> Beacon is a production-oriented neighborhood safety platform built for organized residential communities and gated estates across Lagos, Abuja, Port Harcourt, and Uyo.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E293B] dark:text-slate-200">
              Emergency Dispatch (Nigeria)
            </h4>
            <div className="text-xs text-[#64748B] dark:text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-red-500"/>
                <span>National Emergency: <strong className="text-slate-700 dark:text-slate-300">112 / 767</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"/>
                <span>Ibom Community Watch Dispatch: <strong className="text-slate-700 dark:text-slate-300">0800-RRS-PATROL</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400"/>
                <span>Estate Security Base: <strong className="text-slate-700 dark:text-slate-300">Channel 1 BP</strong></span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E293B] dark:text-slate-200">
                Quick Access
              </h4>
              <div className="flex flex-col space-y-1.5 text-xs text-[#64748B] dark:text-slate-400">
                <button onClick={() => onNavigate('incidents')} className="text-left hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors">
                  Public Incident Feed
                </button>
                <button onClick={() => onNavigate('report')} className="text-left hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors">
                  Submit Incident Report
                </button>
                <button onClick={() => onNavigate('patrol')} className="text-left hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors">
                  Patrol Checkpoint Logs
                </button>
                <button onClick={() => onNavigate('alerts')} className="text-left hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors">
                  Estate Safety Broadcasts
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Display Theme:
              </span>
              <ThemeToggle variant="segmented" size="sm"/>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E2E8F0] dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B] dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer">About Beacon</span>
            <span>•</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer">Privacy & Data Governance</span>
            <span>•</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer">Estate Security Terms</span>
            <span>•</span>
            <span className="hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer">Contact Command Base</span>
          </div>
          <div>
            © 2026 Beacon Platform. Light the way to safer neighborhoods.
          </div>
        </div>
      </div>
    </footer>);
};