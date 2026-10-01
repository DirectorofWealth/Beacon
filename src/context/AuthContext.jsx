import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, getStoredToken, getStoredUser, setStoredToken, setStoredUser } from '../lib/api';
export { getStoredUser, getStoredToken };
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => getStoredUser());
    const [token, setToken] = useState(() => getStoredToken());
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function initSession() {
            const storedTok = getStoredToken();
            if (storedTok) {
                try {
                    const remoteUser = await api.getCurrentUser();
                    if (remoteUser) {
                        setUser(remoteUser);
                        setToken(storedTok);
                    }
                }
                catch (err) {
                    console.warn('Could not refresh remote session, using local credentials');
                    const localUsr = getStoredUser();
                    if (localUsr) {
                        setUser(localUsr);
                        setToken(storedTok);
                    }
                }
            }
            setLoading(false);
        }
        initSession();
    }, []);
    const login = useCallback(async (email, password) => {
        setLoading(true);
        try {
            const result = await api.login(email, password);
            setUser(result.user);
            setToken(result.token);
        }
        finally {
            setLoading(false);
        }
    }, []);
    const register = useCallback(async (data) => {
        setLoading(true);
        try {
            const result = await api.register(data);
            setUser(result.user);
            setToken(result.token);
        }
        finally {
            setLoading(false);
        }
    }, []);
    const logout = useCallback(async () => {
        setLoading(true);
        try {
            await api.logout();
        }
        finally {
            setUser(null);
            setToken(null);
            setLoading(false);
        }
    }, []);
    const updateProfile = useCallback(async (data) => {
        const updated = await api.updateProfile(data);
        setUser(updated);
    }, []);
    const isAdmin = user?.role === 'admin';
    const isOfficer = user?.role === 'patrol_officer' || user?.role === 'admin';
    const isResident = !!user;
    return (<AuthContext.Provider value={{
            user,
            token,
            loading,
            login,
            register,
            logout,
            updateProfile,
            isAuthenticated: !!user,
            isAdmin,
            isOfficer,
            isResident,
        }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};