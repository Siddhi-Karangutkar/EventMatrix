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
