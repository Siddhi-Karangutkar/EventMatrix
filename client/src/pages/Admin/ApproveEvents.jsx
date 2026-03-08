import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Calendar, Users, MapPin, Clock, AlertTriangle, FileText, Info, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { getPendingEvents, approveEvent, rejectEvent } from '../../api/admin';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal';
import './ApproveEvents.css';

const ApproveEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rejectionModal, setRejectionModal] = useState({ show: false, eventId: null, reason: '' });
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchPendingEvents();
    }, []);

    const fetchPendingEvents = async () => {
        try {
            const res = await getPendingEvents();
            setEvents(res.data);
            setLoading(false);
        } catch (err) {
            toast.error('Failed to fetch pending events');
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await approveEvent(id);
            toast.success('Event approved successfully!');
            setEvents(events.filter(e => e._id !== id));
        } catch (err) {
            toast.error('Approval failed');
        }
    };

    const handleRejectClick = (id) => {
        setRejectionModal({ show: true, eventId: id, reason: '' });
    };

    const handleFinalReject = async () => {
        if (!rejectionModal.reason.trim()) {
            return toast.warn('Please provide a reason for rejection');
        }
        try {
            await rejectEvent(rejectionModal.eventId, rejectionModal.reason);
            toast.info('Event rejected');
            setEvents(events.filter(e => e._id !== rejectionModal.eventId));
            setRejectionModal({ show: false, eventId: null, reason: '' });
        } catch (err) {
            toast.error('Rejection failed');
        }
    };

    if (loading) return <div className="loading-spinner">Analyzing pending proposals...</div>;

    return (
        <>
            <div className="approve-events-container animate-fade-in">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Approve Events</h1>
                    <p className="dashboard-subtitle">Review event proposals from clubs and authorize them for the platform.</p>
                </div>

                <div className="events-approval-grid">
                    {events.length > 0 ? (
                        events.map(event => (
                            <div key={event._id} className="event-approval-card glass-panel">
                                <div className="event-card-top">
                                    <span className="category-tag">{event.category}</span>
                                    <span className="club-tag">{event.organizingClub.name}</span>
                                </div>

                                <h2 className="event-title">{event.title}</h2>
                                <p className="event-desc">{event.description}</p>

                                <div className="event-meta-grid">
                                    <div className="meta-item">
                                        <Calendar size={14} />
                                        <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="meta-item">
                                        <Clock size={14} />
                                        <span>{event.startTime} - {event.endTime}</span>
                                    </div>
                                    <div className="meta-item">
                                        <MapPin size={14} />
                                        <span>{event.venue} ({event.mode})</span>
                                    </div>
                                    <div className="meta-item">
                                        <Users size={14} />
                                        <span>Limit: {event.maxParticipants || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="event-organizer-info">
                                    <Info size={14} />
                                    <span>Organized by: <strong>{event.organizerName}</strong></span>
                                </div>

                                <div className="approval-actions">
                                    <button className="btn approve-btn" onClick={() => handleApprove(event._id)}>
                                        <CheckCircle size={18} /> Approve
                                    </button>
                                    <button className="btn details-btn" onClick={() => setSelectedEvent(event)}>
                                        <Eye size={18} /> Details
                                    </button>
                                    <button className="btn reject-btn" onClick={() => handleRejectClick(event._id)}>
                                        <XCircle size={18} /> Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state glass-panel">
                            <CheckCircle size={48} className="success-icon" />
                            <h3>All clear!</h3>
                            <p>No pending event proposals to review.</p>
                        </div>
                    )}
                </div>

                {rejectionModal.show && (
                    <div className="modal-overlay">
                        <div className="modal-content glass-panel animate-zoom-in rejected-border">
                            <div className="modal-header">
                                <AlertTriangle size={24} className="warn-icon" />
                                <h2>Reject Proposal</h2>
                            </div>
                            <p>Provide specific feedback to the club on why this event was rejected. They will be able to edit and resubmit.</p>
                            <textarea
                                placeholder="Reason for rejection (e.g., date conflict, incomplete details)..."
                                value={rejectionModal.reason}
                                onChange={(e) => setRejectionModal({ ...rejectionModal, reason: e.target.value })}
                            ></textarea>
                            <div className="modal-actions">
                                <button className="btn cancel-btn" onClick={() => setRejectionModal({ show: false, eventId: null, reason: '' })}>
                                    Keep for Review
                                </button>
                                <button className="btn final-reject-btn" onClick={handleFinalReject}>
                                    Confirm Rejection
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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

export default ApproveEvents;
