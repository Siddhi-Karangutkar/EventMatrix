import React from 'react';
import { CalendarCheck, CheckCircle, Clock } from 'lucide-react';
import EventCard from '../../components/EventCard/EventCard';
import './StudentDashboard.css';

const MOCK_EVENTS = [
    {
        id: 1,
        title: "Annual Tech Symposium 2026",
        clubName: "Computer Science Club",
        date: "Mar 15, 2026",
        time: "09:00 AM",
        venue: "Main Auditorium",
        participants: 450,
        type: "Free",
        isTrending: true,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Introduction to Machine Learning Workshop",
        clubName: "AI Society",
        date: "Mar 18, 2026",
        time: "02:00 PM",
        venue: "Lab 4, Tech Block",
        participants: 120,
        type: "Free",
        isTrending: false,
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Spring Cultural Fest: Resonance",
        clubName: "Cultural Committee",
        date: "Apr 05, 2026",
        time: "05:00 PM",
        venue: "College Grounds",
        participants: 1200,
        type: "Paid",
        isTrending: true,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80"
    }
];

const StudentDashboard = () => {
    return (
        <div className="dashboard-container animate-fade-in">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Welcome back, John! 👋</h1>
                <p className="dashboard-subtitle">Here's what's happening around campus.</p>
            </div>

            {/* Stats Section */}
            <div className="stats-grid">
                <div className="stat-card-dash glass-panel blue-accent">
                    <div className="stat-icon"><CalendarCheck size={28} /></div>
                    <div className="stat-content">
                        <h3>Registered</h3>
                        <span className="stat-value">5</span>
                        <p>Upcoming events</p>
                    </div>
                </div>

                <div className="stat-card-dash glass-panel green-accent">
                    <div className="stat-icon"><CheckCircle size={28} /></div>
                    <div className="stat-content">
                        <h3>Attended</h3>
                        <span className="stat-value">12</span>
                        <p>Past events</p>
                    </div>
                </div>

                <div className="stat-card-dash glass-panel purple-accent">
                    <div className="stat-icon"><Clock size={28} /></div>
                    <div className="stat-content">
                        <h3>Pending</h3>
                        <span className="stat-value">2</span>
                        <p>Awaiting approval</p>
                    </div>
                </div>
            </div>

            {/* Recommended Events Section */}
            <div className="dashboard-section mt-8">
                <div className="section-header">
                    <h2>Recommended for You</h2>
                    <a href="/student/browse" className="view-all-link">Browse All</a>
                </div>

                <div className="events-grid">
                    {MOCK_EVENTS.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
