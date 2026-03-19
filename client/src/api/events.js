import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/api/events' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const createEvent = (data) => API.post('/create', data);
export const getEventById = (id) => API.get(`/${id}`);
export const getClubEvents = (clubId) => API.get(`/club/${clubId}`);
export const updateEvent = (id, data) => API.put(`/update/${id}`, data);
export const postEvent = (id) => API.put(`/post/${id}`);
export const browseEvents = () => API.get('/browse');
export const generateAttendanceCode = (id) => API.post(`/${id}/attendance/generate`);
export const markAttendance = (id, data) => API.post(`/${id}/attendance/mark`, data);
export const getAttendanceStatus = (id) => API.get(`/${id}/attendance`);

// Manage Events
export const closeRegistration = (id) => API.put(`/close-registration/${id}`);
export const proposeEventEdit = (id, data) => API.post(`/edit-propose/${id}`, data);
export const getClubEditedEvents = (clubId) => API.get(`/edited-events/club/${clubId}`);
export const applyEventEdit = (editId) => API.put(`/apply-edit/${editId}`);
export const notifyParticipants = (id) => API.post(`/notify-participants/${id}`);
