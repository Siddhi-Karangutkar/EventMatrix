import React, { useState, useEffect } from 'react';
import { getStudentRegistrations } from '../../api/registrations';
import {
    Calendar, CheckCircle2, MapPin,
    Trophy, Download, Award
} from 'lucide-react';
import { toast } from 'react-toastify';
import './AttendedEvents.css';

const AttendedEvents = () => {
    const [attendedEvents, setAttendedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAttendedEvents();
    }, []);

    const fetchAttendedEvents = async () => {
        try {
            const student = JSON.parse(localStorage.getItem('user'));
            if (!student) return;
            const res = await getStudentRegistrations(student.id || student._id);
            // Filter only events where attendance is marked as 'present'
            const attended = res.data.filter(reg => reg.attendanceStatus === 'present');
            setAttendedEvents(attended);
        } catch (err) {
            toast.error('Failed to load attended events');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading-container">Retrieving your history...</div>;

    return (
        <div className="attended-events-container animate-fade-in">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Attended Events</h1>
                <p className="dashboard-subtitle">A record of all events you have successfully participated in.</p>
            </div>

            {attendedEvents.length > 0 ? (
                <div className="attended-grid">
                    {attendedEvents.map((reg) => (
                        <div key={reg._id} className="attended-card glass-panel">
                            <div className="attended-badge">
                                <CheckCircle2 size={16} /> <span>Verified Attendance</span>
                            </div>

                            <h3 className="attended-title">{reg.event.title}</h3>
                            <p className="attended-club">Organized by {reg.event.organizingClub.name}</p>

                            <div className="attended-meta">
                                <div className="attended-meta-item">
                                    <Calendar size={14} />
                                    <span>{new Date(reg.registeredAt).toLocaleDateString()}</span>
                                </div>
                                <div className="attended-meta-item">
                                    <Award size={14} />
                                    <span>Participation Verified</span>
                                </div>
                            </div>

                            <button className="btn-certificate-download" disabled>
                                <Download size={16} /> Certificate Coming Soon
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state glass-panel">
                    <Trophy size={48} className="empty-icon" />
                    <h3>No attended events yet</h3>
                    <p>Once you mark your attendance at an event, it will appear here.</p>
                </div>
            )}
        </div>
    );
};

export default AttendedEvents;
