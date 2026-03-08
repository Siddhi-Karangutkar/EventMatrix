import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api/admin' });

// Add token to headers for protected routes
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const getPendingClubs = () => API.get('/pending-clubs');
export const approveClub = (id) => API.put(`/approve-club/${id}`);
export const rejectClub = (id, reason) => API.delete(`/reject-club/${id}`, { data: { reason } });

// Event Management
export const getPendingEvents = () => API.get('/pending-events');
export const approveEvent = (id) => API.put(`/approve-event/${id}`);
export const rejectEvent = (id, reason) => API.put(`/reject-event/${id}`, { reason });
export const getConductedEvents = () => API.get('/conducted-events');

export default API;
