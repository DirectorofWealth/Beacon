import React, { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext(undefined);
const THEME_STORAGE_KEY = 'beacon_theme';
export const ThemeProvider = ({ children }) => {
    const [theme, setThemeState] = useState(() => {
        try {
            const saved = localStorage.getItem(THEME_STORAGE_KEY);
            if (saved === 'light' || saved === 'dark' || saved === 'system') {
                return saved;
            }
        }
        catch {
        }
        return 'light';
    });
    const [systemIsDark, setSystemIsDark] = useState(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia)
            return;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            setSystemIsDark(e.matches);
        };
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
        else {
            mediaQuery.addListener(handleChange);
            return () => mediaQuery.removeListener(handleChange);
        }
    }, []);
    const isDark = theme === 'dark' || (theme === 'system' && systemIsDark);
    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
        }
        else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
        }
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDark ? '#0B132B' : '#FFFFFF');
        }
    }, [isDark]);
    const setTheme = (newTheme) => {
        setThemeState(newTheme);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        }
        catch {
        }
    };
    const toggleTheme = () => {
        const nextTheme = isDark ? 'light' : 'dark';
        setTheme(nextTheme);
    };
    return (<ThemeContext.Provider value={{ theme, isDark, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>);
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};