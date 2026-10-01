import React, { useState } from 'react';
import { Shield, Palette, Layers, FileText, Users, Radio, CheckCircle2, AlertTriangle, X, } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';
import { StatusBadge, PriorityBadge, SeverityBadge, RoleBadge } from '../ui/Badge';
export const DesignSystemSpecModal = ({ isOpen, onClose, }) => {
    const [activeTab, setActiveTab] = useState('overview');
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] transition-colors" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-[#0B192C] text-white">
          <div className="flex items-center gap-3">
            <BrandLogo variant="icon-square" size="sm"/>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight text-white">
                  Beacon Architecture & Design Language
                </h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                  Research Brief 2.0
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Light the way to safer neighborhoods • Specification & Scope Integration
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" title="Close Specification">
            <X className="w-5 h-5"/>
          </button>
        </div>

        <div className="flex items-center gap-2 px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 overflow-x-auto text-xs font-semibold py-2">
          <button onClick={() => setActiveTab('overview')} className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${activeTab === 'overview'
            ? 'bg-white dark:bg-slate-800 text-[#2563EB] dark:text-blue-400 shadow-xs border border-slate-200 dark:border-slate-700'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
            <FileText className="w-3.5 h-3.5"/>
            Executive Summary
          </button>
          <button onClick={() => setActiveTab('brand')} className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${activeTab === 'brand'
            ? 'bg-white dark:bg-slate-800 text-[#2563EB] dark:text-blue-400 shadow-xs border border-slate-200 dark:border-slate-700'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
            <Palette className="w-3.5 h-3.5"/>
            Design Tokens & Brand Identity
          </button>
          <button onClick={() => setActiveTab('scope')} className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${activeTab === 'scope'
            ? 'bg-white dark:bg-slate-800 text-[#2563EB] dark:text-blue-400 shadow-xs border border-slate-200 dark:border-slate-700'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
            <Layers className="w-3.5 h-3.5"/>
            Project Scope & Roadmap
          </button>
          <button onClick={() => setActiveTab('roles')} className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${activeTab === 'roles'
            ? 'bg-white dark:bg-slate-800 text-[#2563EB] dark:text-blue-400 shadow-xs border border-slate-200 dark:border-slate-700'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
            <Users className="w-3.5 h-3.5"/>
            3-Role Permissions Matrix
          </button>
          <button onClick={() => setActiveTab('api')} className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ${activeTab === 'api'
            ? 'bg-white dark:bg-slate-800 text-[#2563EB] dark:text-blue-400 shadow-xs border border-slate-200 dark:border-slate-700'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
            <Radio className="w-3.5 h-3.5"/>
            API Contracts & Architecture
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 text-slate-800 dark:text-slate-200 text-sm leading-relaxed space-y-6">
          {activeTab === 'overview' && (<div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Product: Beacon — Community Safety Platform
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">
                    Tagline: <span className="italic font-medium">"Light the way to safer neighborhoods"</span> • Target: Organized residential communities in Nigeria
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Live Production API Connected
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"/>
                    The Problem in Nigerian Residential Estates
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                    <li>
                      <strong>WhatsApp Noise & Fragmentation:</strong> Critical emergency alerts get buried beneath gossip, birthday wishes, and estate notices.
                    </li>
                    <li>
                      <strong>Rumor Amplification:</strong> Zero structured verification leads to false alarms and neighborhood panic.
                    </li>
                    <li>
                      <strong>Patrol Invisibility:</strong> Residents don't know whether night patrols are walking or sleeping at the gate.
                    </li>
                    <li>
                      <strong>Lost Audit Trails:</strong> No persistent record of resolution, officer response times, or security accountability.
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"/>
                    The Beacon Solution Framework
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                    <li>
                      <strong>Calm Vigilance:</strong> Safety-critical UI that conveys clarity and urgency without inducing collective panic.
                    </li>
                    <li>
                      <strong>Structured Incident Lifecycle:</strong> From Report → Under Review → In Progress → Resolved with digital audit trail.
                    </li>
                    <li>
                      <strong>Patrol Accountability:</strong> Real-time patrol timers, zone assignments, and GPS/digital checkpoint logging.
                    </li>
                    <li>
                      <strong>Targeted Broadcasts:</strong> Zone-specific emergency alerts that expire automatically and notify target corridors.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Target Corridor Validation (Nigeria)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <div className="font-semibold text-slate-900 dark:text-white">Lekki & Ikoyi</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Lagos State Planned Corridors</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <div className="font-semibold text-slate-900 dark:text-white">Maitama & Asokoro</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Abuja FCT Residential Districts</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <div className="font-semibold text-slate-900 dark:text-white">Old GRA & Trans-Amadi</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Port Harcourt, Rivers State</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                    <div className="font-semibold text-slate-900 dark:text-white">Ewet Housing & Shelter</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Uyo, Akwa Ibom State</div>
                  </div>
                </div>
              </div>
            </div>)}

          {activeTab === 'brand' && (<div className="space-y-6">
              <div className="p-6 rounded-xl bg-[#0B192C] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A00D] font-bold">
                    Official Brand Identity
                  </span>
                  <h3 className="text-xl font-bold tracking-tight">The Beacon Lighthouse Mark</h3>
                  <p className="text-xs text-slate-300 max-w-md">
                    Geometric fusion of the letter <strong>'B'</strong> with a coastal lighthouse beacon. The top counter circle represents the golden focal light of neighborhood protection.
                  </p>
                </div>
                <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-col items-center gap-1">
                    <BrandLogo variant="mark-only" theme="light" size="lg"/>
                    <span className="text-[10px] text-slate-400 font-mono">Reverse Mark</span>
                  </div>
                  <div className="h-10 w-px bg-slate-800"/>
                  <div className="flex flex-col items-center gap-1 bg-white p-2 rounded-lg">
                    <BrandLogo variant="mark-only" theme="dark" size="lg"/>
                    <span className="text-[10px] text-slate-600 font-mono">Solid Mark</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600"/>
                      Severity Palette — IMMUTABLE MANDATE
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Severity colors mean the exact same thing everywhere. Red is strictly reserved for critical/emergency life safety, never for neutral UI actions.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Info</span>
                      <SeverityBadge severity="info" size="sm"/>
                    </div>
                    <code className="text-[11px] font-mono text-slate-500 dark:text-slate-400">#0284C7 • Blue solid</code>
                    <span className="text-[11px] text-slate-600 dark:text-slate-300">General community notices and town hall meetings.</span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Warning</span>
                      <SeverityBadge severity="warning" size="sm"/>
                    </div>
                    <code className="text-[11px] font-mono text-slate-500 dark:text-slate-400">#D97706 • Amber solid</code>
                    <span className="text-[11px] text-slate-600 dark:text-slate-300">Caution required, scheduled maintenance, road repairs.</span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Critical</span>
                      <SeverityBadge severity="critical" size="sm"/>
                    </div>
                    <code className="text-[11px] font-mono text-slate-500 dark:text-slate-400">#DC2626 • Red solid</code>
                    <span className="text-[11px] text-slate-600 dark:text-slate-300">Immediate attention, suspicious persons, active hazard.</span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Emergency</span>
                      <SeverityBadge severity="emergency" size="sm"/>
                    </div>
                    <code className="text-[11px] font-mono text-slate-500 dark:text-slate-400">#7F1D1D • Crimson pulse</code>
                    <span className="text-[11px] text-slate-600 dark:text-slate-300">Life safety, perimeter breach, armed threat.</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Status Lifecycle Badges</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Reported</span>
                      <StatusBadge status="reported" size="sm"/>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Under Review</span>
                      <StatusBadge status="under_review" size="sm"/>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">In Progress</span>
                      <StatusBadge status="in_progress" size="sm"/>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Resolved</span>
                      <StatusBadge status="resolved" size="sm"/>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-600 dark:text-slate-400">Dismissed</span>
                      <StatusBadge status="dismissed" size="sm"/>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Priority Indicators</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Low (Gray dot)</span>
                      <PriorityBadge priority="low"/>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">Medium (Amber dot)</span>
                      <PriorityBadge priority="medium"/>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">High (Red dot)</span>
                      <PriorityBadge priority="high"/>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-600 dark:text-slate-400">Critical (Crimson dot + bold)</span>
                      <PriorityBadge priority="critical"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}

          {activeTab === 'scope' && (<div className="space-y-6">
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/40">
                <h3 className="font-bold text-blue-900 dark:text-blue-200 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
                  Dual-Phase Implementation Roadmap
                </h3>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Integrating the original Community Watch brief with Readme 2.0 specifications. The entire foundation and stretch features are unified and operational.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Phase 1: Resident Core MVP</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      100% Implemented
                    </span>
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"/>
                      <span><strong>Public Stats Dashboard:</strong> Pulls live platform metrics from <code>/public/stats</code>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"/>
                      <span><strong>Structured Incident Feed:</strong> Search, filters (Status, Category, Priority, Nigerian Zone), pagination.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"/>
                      <span><strong>Two-Column Detail View:</strong> Description, photos gallery, reporter metadata, upvotes, and threaded comments.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"/>
                      <span><strong>Structured Report Form:</strong> Categorization, priority scale, geolocation picker, photo preview, draft saving.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Phase 2: Patrol & Admin Stretch</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      100% Implemented
                    </span>
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"/>
                      <span><strong>Patrol Shift Engine:</strong> Start shift, live elapsed timer (hh:mm:ss), checkpoint modal, completion summary.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"/>
                      <span><strong>Patrol Accountability:</strong> Checkpoint timeline (Secure, Check, Hazard Resolved) visible across the estate.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"/>
                      <span><strong>Zone-Targeted Alert Broadcast:</strong> Admin creation tool with auto-expiration (2h - 7d) and emergency banner.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"/>
                      <span><strong>Incident Resolution Control:</strong> Patrol officers and admins update incident progress with notes.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>)}

          {activeTab === 'roles' && (<div className="space-y-6">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Role Inheritance Hierarchy</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Admin is the highest authority and inherits all officer and resident capabilities. Officers inherit all resident actions.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <th className="p-2.5 font-bold">Platform Capability</th>
                        <th className="p-2.5 font-bold text-center">Resident</th>
                        <th className="p-2.5 font-bold text-center">Patrol Officer</th>
                        <th className="p-2.5 font-bold text-center">Estate Admin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">View Public Safety Stats</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">Browse & Filter Incidents</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">Submit Incident Report</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">Upvote & Add Comments</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">Delete Own Reports</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                      </tr>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                        <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">Start / End Patrol Shift</td>
                        <td className="p-2.5 text-center text-slate-300 dark:text-slate-600">❌</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                      </tr>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                        <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">Log Patrol Checkpoints</td>
                        <td className="p-2.5 text-center text-slate-300 dark:text-slate-600">❌</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                      </tr>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                        <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">Update Incident Status</td>
                        <td className="p-2.5 text-center text-slate-300 dark:text-slate-600">❌</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                      </tr>
                      <tr className="bg-blue-50/30 dark:bg-blue-950/20">
                        <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">Broadcast Safety Alerts</td>
                        <td className="p-2.5 text-center text-slate-300 dark:text-slate-600">❌</td>
                        <td className="p-2.5 text-center text-slate-300 dark:text-slate-600">❌</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                      </tr>
                      <tr className="bg-blue-50/30 dark:bg-blue-950/20">
                        <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">Target Alerts by Zone</td>
                        <td className="p-2.5 text-center text-slate-300 dark:text-slate-600">❌</td>
                        <td className="p-2.5 text-center text-slate-300 dark:text-slate-600">❌</td>
                        <td className="p-2.5 text-center text-emerald-600 font-bold">✅</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 mb-1">
                    <RoleBadge role="resident"/>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">Ada Eze</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    ada@beacon.ng • Resident in Lekki Phase 1. Quick incident reporting & neighborhood status check.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 mb-1">
                    <RoleBadge role="patrol_officer"/>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">Officer Musa</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    musa@beacon.ng • Badge #BCN-042. Shift clock-in, checkpoint inspection, incident resolution.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 mb-1">
                    <RoleBadge role="admin"/>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">Mrs. Okonkwo</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    okonkwo@beacon.ng • Estate Association Chair. Zone-wide alerts & full governance.
                  </p>
                </div>
              </div>
            </div>)}

          {activeTab === 'api' && (<div className="space-y-4">
              <div className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs flex items-center justify-between">
                <span>API Endpoint: https://1-community-watch-api.vercel.app/api/v1</span>
                <span className="text-emerald-400 font-semibold">JWT Bearer Auth</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 font-mono font-bold text-slate-900 dark:text-white mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px]">GET</span>
                    /public/stats
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Public community safety metrics. Total incidents, resolution rate %, active patrol shifts, recent public notices. Unauthenticated.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 font-mono font-bold text-slate-900 dark:text-white mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-[10px]">POST</span>
                    /auth/login & /auth/register
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Bearer token generation, role assignment (resident, patrol_officer, admin), Nigerian zone selection, badge number validation.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 font-mono font-bold text-slate-900 dark:text-white mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px]">GET / POST</span>
                    /incidents & /incidents/&#123;id&#125;/upvote
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Query filtering by status, category, priority, and zone. Community verification toggle with confirmation counters.
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 font-mono font-bold text-slate-900 dark:text-white mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-[10px]">POST</span>
                    /patrols/start & /patrols/&#123;id&#125;/checkpoint
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Officer patrol shift management with timestamped checkpoint logging (Secure, Check, Hazard Resolved, Issue Noted).
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-2 font-mono font-bold text-slate-900 dark:text-white mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-[10px]">POST</span>
                    /alerts
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Admin emergency broadcasting with targetZone routing and automatic hourly expiration.
                  </p>
                </div>
              </div>
            </div>)}
        </div>

        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Beacon Design Language & Product Scope • Version 2.0</span>
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-[#0F172A] dark:bg-blue-600 text-white font-semibold hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors">
            Done Viewing
          </button>
        </div>
      </div>
    </div>);
};