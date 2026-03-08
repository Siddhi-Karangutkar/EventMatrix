import api from './index';

export const getStudentNotifications = (studentId) => api.get(`/notifications/${studentId}`);
export const markAsRead = (id) => api.put(`/notifications/read/${id}`);
