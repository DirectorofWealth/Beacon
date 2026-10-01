const BASE_URL = 'https://1-community-watch-api.vercel.app/api/v1';
const TOKEN_KEY = 'beacon_token';
const USER_KEY = 'beacon_user';

export function getStoredToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token) {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        localStorage.removeItem(TOKEN_KEY);
    }
}

export function getStoredUser() {
    try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function setStoredUser(user) {
    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(USER_KEY);
    }
}

async function apiFetch(endpoint, options = {}) {
    const token = getStoredToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${BASE_URL}${endpoint}`;
    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => ({}));

    if (res.status === 401) {
        setStoredToken(null);
        setStoredUser(null);
        if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
        }
    }

    if (!res.ok) {
        throw new Error(data.error || data.message || `API error ${res.status}`);
    }

    return data;
}

export const api = {
    async getPublicStats() {
        const res = await apiFetch('/public/stats');
        return res.data;
    },

    async login(email, password) {
        const res = await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        setStoredToken(res.token);
        setStoredUser(res.user);
        return { user: res.user, token: res.token };
    },

    async register(data) {
        const res = await apiFetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        setStoredToken(res.token);
        setStoredUser(res.user);
        return { user: res.user, token: res.token };
    },

    async requestPasswordReset(email) {
        const res = await apiFetch('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
        return res;
    },

    async logout() {
        try {
            await apiFetch('/auth/logout', { method: 'POST' });
        } catch {
            /* noop */
        }
        setStoredToken(null);
        setStoredUser(null);
    },

    async getCurrentUser() {
        const res = await apiFetch('/auth/me');
        const user = res.user || res.data;
        if (user) setStoredUser(user);
        return user;
    },

    async updateProfile(data) {
        const res = await apiFetch('/auth/me', {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
        const updated = res.user || res.data || { ...getStoredUser(), ...data };
        setStoredUser(updated);
        return updated;
    },

    async dismissAlert(alertId) {
        const res = await apiFetch(`/alerts/${alertId}`, {
            method: 'DELETE',
        });
        return res.data || res.alert;
    },

    async getIncidents(filters = {}) {
        const query = new URLSearchParams();
        if (filters.status && filters.status !== 'all')
            query.set('status', filters.status);
        if (filters.category && filters.category !== 'all')
            query.set('category', filters.category);
        if (filters.priority && filters.priority !== 'all')
            query.set('priority', filters.priority);
        if (filters.zone && filters.zone !== 'all' && filters.zone !== 'All Zones')
            query.set('zone', filters.zone);
        if (filters.search)
            query.set('search', filters.search);
        const qs = query.toString();
        const res = await apiFetch(`/incidents${qs ? `?${qs}` : ''}`);
        if (res.success && Array.isArray(res.incidents)) {
            return res.incidents;
        }
        if (Array.isArray(res.data)) {
            return res.data;
        }
        return [];
    },

    async getIncidentById(id) {
        const res = await apiFetch(`/incidents/${id}`);
        if (res.success && res.data) {
            return res.data;
        }
        if (res.success && res.incident) {
            return res.incident;
        }
        return res.data || res.incident || null;
    },

    async createIncident(incidentData) {
        const res = await apiFetch('/incidents', {
            method: 'POST',
            body: JSON.stringify(incidentData),
        });
        if (res.success && res.data) {
            return res.data;
        }
        if (res.success && res.incident) {
            return res.incident;
        }
        return res.data || res.incident;
    },

    async deleteIncident(id) {
        await apiFetch(`/incidents/${id}`, { method: 'DELETE' });
    },

    async updateIncidentStatus(id, status, assignedOfficerId, notes) {
        const res = await apiFetch(`/incidents/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, assignedOfficerId, notes }),
        });
        if (res.success && res.data) {
            return res.data;
        }
        if (res.success && res.incident) {
            return res.incident;
        }
        return res.data || res.incident;
    },

    async toggleUpvote(id) {
        const res = await apiFetch(`/incidents/${id}/upvote`, {
            method: 'POST',
        });
        if (res.success && res.data) {
            return res.data;
        }
        if (res.success && res.incident) {
            return res.incident;
        }
        return res.data || res.incident;
    },

    async addComment(id, message) {
        const res = await apiFetch(`/incidents/${id}/comments`, {
            method: 'POST',
            body: JSON.stringify({ message }),
        });
        if (res.success && res.data) {
            return res.data;
        }
        if (res.success && res.incident) {
            return res.incident;
        }
        return res.data || res.incident;
    },

    async getPatrols(params = {}) {
        const query = new URLSearchParams();
        if (params?.status)
            query.set('status', params.status);
        if (params?.zone)
            query.set('zone', params.zone);
        const qs = query.toString();
        const res = await apiFetch(`/patrols${qs ? `?${qs}` : ''}`);
        if (res.success && Array.isArray(res.patrols)) {
            return res.patrols;
        }
        if (Array.isArray(res.data)) {
            return res.data;
        }
        return [];
    },

    async startPatrol(zone, initialNotes) {
        const res = await apiFetch('/patrols/start', {
            method: 'POST',
            body: JSON.stringify({ zone, initialNotes }),
        });
        if (res.success && res.data) {
            return res.data;
        }
        if (res.success && res.patrol) {
            return res.patrol;
        }
        return res.data || res.patrol;
    },

    async logCheckpoint(patrolId, checkpoint) {
        const res = await apiFetch(`/patrols/${patrolId}/checkpoint`, {
            method: 'POST',
            body: JSON.stringify(checkpoint),
        });
        if (res.success && res.data) {
            return res.data;
        }
        if (res.success && res.patrol) {
            return res.patrol;
        }
        return res.data || res.patrol;
    },

    async endPatrol(patrolId, summary) {
        const res = await apiFetch(`/patrols/${patrolId}/end`, {
            method: 'POST',
            body: JSON.stringify({ summary }),
        });
        if (res.success && res.data) {
            return res.data;
        }
        if (res.success && res.patrol) {
            return res.patrol;
        }
        return res.data || res.patrol;
    },

    async getAlerts(params = {}) {
        const query = new URLSearchParams();
        if (params?.zone && params.zone !== 'All Zones')
            query.set('zone', params.zone);
        if (params?.severity)
            query.set('severity', params.severity);
        const qs = query.toString();
        const res = await apiFetch(`/alerts${qs ? `?${qs}` : ''}`);
        if (res.success && Array.isArray(res.alerts)) {
            return res.alerts;
        }
        if (Array.isArray(res.data)) {
            return res.data;
        }
        return [];
    },

    async broadcastAlert(data) {
        const res = await apiFetch('/alerts', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (res.success && res.data) {
            return res.data;
        }
        if (res.success && res.alert) {
            return res.alert;
        }
        return res.data || res.alert;
    },

};