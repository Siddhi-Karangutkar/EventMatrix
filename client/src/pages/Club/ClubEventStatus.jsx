import React, { useState, useEffect } from 'react';
import {
    Clock, CheckCircle2, XCircle, AlertCircle,
    Edit3, Send, Calendar, MapPin, Eye
} from 'lucide-react';
import { getClubEvents, postEvent } from '../../api/events';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ClubEventStatus.css';

const ClubEventStatus = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clubId, setClubId] = useState(null); // New state to store club ID
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); // Changed key to 'user'
        if (user && (user.id || user._id)) {
            setClubId(user.id || user._id); // Set clubId from user object
        } else {
            // Handle case where user is not found or doesn't have an ID
            setLoading(false);
            toast.error('Club information not found. Please log in.');
        }
    }, []);

    useEffect(() => {
        if (clubId) { // Fetch events only when clubId is available
            fetchEvents();
        }
    }, [clubId]); // Rerun when clubId changes

    const fetchEvents = async () => {
        try {
            const res = await getClubEvents(clubId); // Use clubId state
            setEvents(res.data);
            setLoading(false);
        } catch (err) {
            toast.error('Failed to fetch event status');
            setLoading(false);
        }
    };

    const handlePost = async (id) => {
        try {
            await postEvent(id);
            toast.success('Event published! It is now visible to students.');
            fetchEvents(); // Refresh list
        } catch (err) {
            toast.error('Failed to post event');
        }
    };

    if (loading) return <div className="loading-spinner">Retrieving event status...</div>;

    return (
        <>
            <div className="event-status-container animate-fade-in">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">My Event Proposals</h1>
                    <p className="dashboard-subtitle">Track the approval status of your events and publish approved ones.</p>
                </div>

                <div className="status-grid">
                    {events.length > 0 ? (
                        events.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(event => (
                            <div key={event._id} className={`status-card glass-panel status-${event.status}`}>
                                <div className="status-card-header">
                                    <span className={`status-pill ${event.status}`}>
                                        {event.status === 'pending' && <Clock size={12} />}
                                        {event.status === 'approved' && <CheckCircle2 size={12} />}
                                        {event.status === 'rejected' && <XCircle size={12} />}
                                        {event.status.toUpperCase()}
                                    </span>
                                    {event.isPosted && <span className="posted-pill">POSTED</span>}
                                    <button className="view-details-btn-small" onClick={() => setSelectedEvent(event)}>
                                        <Eye size={14} /> Details
                                    </button>
                                </div>

                                <h3 className="event-title">{event.title}</h3>

                                <div className="event-mini-meta">
                                    <span><Calendar size={13} /> {new Date(event.eventDate).toLocaleDateString()}</span>
                                    <span><MapPin size={13} /> {event.venue}</span>
                                </div>

                                {event.status === 'rejected' && (
                                    <div className="rejection-box">
                                        <div className="rb-header">
                                            <AlertCircle size={14} />
                                            <span>Rejection Reason:</span>
                                        </div>
                                        <p>{event.rejectionReason || 'No reason provided by admin.'}</p>
                                        <button className="btn edit-btn" onClick={() => navigate(`/club/edit-event/${event._id}`)}>
                                            <Edit3 size={16} /> Edit & Repost
                                        </button>
                                    </div>
                                )}

                                {event.status === 'approved' && !event.isPosted && (
                                    <div className="post-box">
                                        <p>Your event is approved! Click below to make it visible to all students.</p>
                                        <button className="btn post-btn" onClick={() => handlePost(event._id)}>
                                            <Send size={16} /> Post Event Now
                                        </button>
                                    </div>
                                )}

                                {event.status === 'approved' && event.isPosted && (
                                    <div className="live-box">
                                        <Eye size={16} /> <span>Event is live on Student Portal</span>
                                    </div>
                                )}

                                {event.status === 'pending' && (
                                    <div className="pending-box">
                                        <p>Our administrators are currently reviewing your proposal. You will be notified once a decision is made.</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="empty-state glass-panel">
                            <AlertCircle size={48} className="muted-icon" />
                            <h3>No events found</h3>
                            <p>You haven't proposed any events yet. Click 'Create Event' to get started!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Event Details Modal - Moved outside to fix fixed positioning */}
            {selectedEvent && (
                <EventDetailsModal
                    event={selectedEvent}
                    showRegister={false}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </>
    );
};

export default ClubEventStatus;
