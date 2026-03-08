import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, XCircle, Clock, Info } from 'lucide-react';
import { getClubEvents } from '../../api/events';
import './ClubNotifications.css';

const ClubNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const club = JSON.parse(localStorage.getItem('user'));
        if (club) fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const club = JSON.parse(localStorage.getItem('user')); // Re-fetch club here for consistency or pass it
            if (!club) {
                setLoading(false);
                return;
            }
            const res = await getClubEvents(club.id || club._id);
            // We'll treat status changes as "notifications" for now
            const events = res.data.map(event => ({
                id: event._id,
                title: event.title,
                status: event.status,
                reason: event.rejectionReason,
                time: event.updatedAt || event.createdAt,
                type: event.status === 'pending' ? 'info' : event.status === 'approved' ? 'success' : 'error'
            }));
            setNotifications(events.sort((a, b) => new Date(b.time) - new Date(a.time)));
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading-spinner">Fetching alerts...</div>;

    return (
        <div className="notifications-container animate-fade-in">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Notifications</h1>
                <p className="dashboard-subtitle">Stay updated on your event proposals and registration activity.</p>
            </div>

            <div className="notifications-list glass-panel">
                {notifications.length > 0 ? (
                    notifications.map(n => (
                        <div key={n.id} className={`notification-item ${n.type}`}>
                            <div className="n-icon">
                                {n.status === 'approved' && <CheckCircle size={20} />}
                                {n.status === 'rejected' && <XCircle size={20} />}
                                {n.status === 'pending' && <Clock size={20} />}
                            </div>
                            <div className="n-content">
                                <p className="n-text">
                                    Your event <strong>"{n.title}"</strong> has been {n.status}.
                                    {n.status === 'approved' && ' You can now post it live!'}
                                </p>
                                {n.status === 'rejected' && (
                                    <p className="n-reason">Reason: {n.reason}</p>
                                )}
                                <span className="n-time">{new Date(n.time).toLocaleString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-notifications">
                        <Bell size={40} className="muted-icon" />
                        <p>No new notifications at this time.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClubNotifications;
