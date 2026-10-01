import React from 'react';
export const BrandLogo = ({ variant = 'full', theme = 'dark', size = 'md', className = '', showSubtitle = false, tag = '', }) => {
    const iconSizes = {
        sm: 'h-7 w-7',
        md: 'h-9 w-9',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };
    const textSizes = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
        xl: 'text-3xl',
    };
    const subTextSizes = {
        sm: 'text-[9px] tracking-widest',
        md: 'text-[10px] tracking-widest',
        lg: 'text-xs tracking-widest',
        xl: 'text-sm tracking-widest',
    };
    const renderLighthouseSvg = (isInverse) => {
        const mainColor = isInverse ? '#F8FAFC' : '#0B192C';
        const cutoutColor = isInverse ? '#0B192C' : '#FFFFFF';
        return (<svg viewBox="0 0 320 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain">
        <path d="M72 0 L80 0 L80 20 L94 20 L76 74 L68 74 L50 20 L64 20 L64 0 Z" fill={mainColor}/>
        <rect x="46" y="74" width="52" height="12" rx="3" fill={mainColor}/>
        <path d="M47 86 L22 430 L115 430 C206 430 252 388 252 316 C252 270 226 235 180 218 C216 202 236 172 236 130 C236 72 190 38 116 38 L72 38 L72 86 Z" fill={mainColor}/>
        <circle cx="150" cy="136" r="40" fill="#E5A00D"/>
        <circle cx="168" cy="310" r="50" fill={cutoutColor}/>
      </svg>);
    };
    if (variant === 'icon-square') {
        return (<div className={`relative inline-flex items-center justify-center rounded-xl bg-[#0B192C] p-1.5 shadow-sm ${iconSizes[size]} ${className}`}>
        {renderLighthouseSvg(true)}
      </div>);
    }
    if (variant === 'mark-only') {
        return (<div className={`inline-block ${iconSizes[size]} ${className}`}>
        {renderLighthouseSvg(theme === 'light')}
      </div>);
    }
    return (<div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className={`relative inline-flex items-center justify-center rounded-xl bg-[#0B192C] dark:bg-blue-600/30 dark:border dark:border-blue-500/30 p-1.5 shadow-sm transition-transform hover:scale-105 ${iconSizes[size]}`}>
        {renderLighthouseSvg(true)}
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`font-black tracking-tight leading-none ${textSizes[size]} ${theme === 'light' ? 'text-white' : 'text-[#0F172A] dark:text-white'}`}>
          BEACON
        </span>
        {tag && (<span className={`font-mono font-bold tracking-widest ${theme === 'light' ? 'text-slate-300' : 'text-[#64748B] dark:text-slate-400'} ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}>
            {tag}
          </span>)}
      </div>
      {showSubtitle && (<span className={`font-semibold font-mono uppercase text-[#D97706] dark:text-amber-400 leading-tight mt-0.5 ${subTextSizes[size]}`}>
          Community Safety
        </span>)}
    </div>);
};