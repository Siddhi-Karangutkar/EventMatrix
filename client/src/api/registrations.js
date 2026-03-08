import api from './index';

export const registerForEvent = (data) => api.post('/registrations/register', data);
export const getStudentRegistrations = (studentId) => api.get(`/registrations/student/${studentId}`);
export const getClubRegistrations = (clubId) => api.get(`/registrations/club/${clubId}`);
export const updateRegistrationStatus = (id, data) => api.put(`/registrations/status/${id}`, data);
