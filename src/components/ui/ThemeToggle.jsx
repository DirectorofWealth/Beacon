import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Laptop } from 'lucide-react';
export const ThemeToggle = ({ variant = 'button', size = 'md', className = '', }) => {
    const { theme, isDark, setTheme, toggleTheme } = useTheme();
    if (variant === 'segmented') {
        const options = [
            { id: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5"/> },
            { id: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5"/> },
            { id: 'system', label: 'System', icon: <Laptop className="w-3.5 h-3.5"/> },
        ];
        return (<div className={`inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 ${className}`} role="radiogroup" aria-label="Color theme selection">
        {options.map(opt => {
                const active = theme === opt.id;
                return (<button key={opt.id} role="radio" aria-checked={active} onClick={() => setTheme(opt.id)} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${active
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
              {opt.icon}
              <span>{opt.label}</span>
            </button>);
            })}
      </div>);
    }
    const buttonSizes = {
        sm: 'p-1.5 text-xs',
        md: 'p-2 text-sm',
    };
    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-4 h-4',
    };
    return (<button onClick={toggleTheme} className={`inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all shadow-2xs ${buttonSizes[size]} ${className}`} title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'} aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}>
      {isDark ? (<Sun className={`${iconSizes[size]} text-amber-400 hover:rotate-45 transition-transform duration-200`}/>) : (<Moon className={`${iconSizes[size]} text-slate-600 hover:-rotate-12 transition-transform duration-200`}/>)}
    </button>);
};