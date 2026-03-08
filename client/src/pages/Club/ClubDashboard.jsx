import React from 'react';
import {
    CalendarPlus,
    CalendarCheck,
    Users,
    TrendingUp,
    ArrowRight,
    Clock,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './ClubDashboard.css';

// ── Mock data ─────────────────────────────────────────────
const STATS = [
    { label: 'Events Created', value: 12, icon: <CalendarPlus size={26} />, color: 'teal', link: '/club/posted-events' },
    { label: 'Events Approved', value: 8, icon: <CalendarCheck size={26} />, color: 'green', link: '/club/event-status' },
    { label: 'Avg Registrations', value: 145, icon: <Users size={26} />, color: 'blue', link: '/club/approve-students' },
];

const RECENT_EVENTS = [
    { id: 1, title: 'Web Dev Workshop', date: 'Mar 15, 2026', status: 'Approved', registrations: 85 },
    { id: 2, title: 'Code Debugging Pro', date: 'Mar 22, 2026', status: 'Pending', registrations: 42 },
    { id: 3, title: 'UI/UX Design Talk', date: 'Apr 02, 2026', status: 'Rejected', registrations: 0 },
];

const PENDING_REGISTRATIONS = [
    { id: 1, student: 'Siddharth Jain', event: 'Web Dev Workshop', date: '2 mins ago' },
    { id: 2, student: 'Ananya Sharma', event: 'Web Dev Workshop', date: '15 mins ago' },
    { id: 3, student: 'Rohan Gupta', event: 'Code Debugging', date: '1 hour ago' },
];

const ClubDashboard = () => (
    <div className="club-dash animate-fade-in">

        <div className="club-dash-header">
            <div>
                <h1 className="dashboard-title">Club Dashboard</h1>
                <p className="dashboard-subtitle">Manage your club's events and student engagement.</p>
            </div>
            <Link to="/club/create-event" className="btn btn-club">
                <CalendarPlus size={18} /> Create New Event
            </Link>
        </div>

        {/* Stat Cards */}
        <div className="club-stats-grid">
            {STATS.map((s, i) => (
                <Link to={s.link} key={i} className={`club-stat-card glass-panel accent-${s.color}`}>
                    <div className={`cstat-icon ${s.color}`}>{s.icon}</div>
                    <div className="cstat-info">
                        <span className="cstat-value">{s.value.toLocaleString()}</span>
                        <span className="cstat-label">{s.label}</span>
                    </div>
                    <ArrowRight size={18} className="cstat-arrow" />
                </Link>
            ))}
        </div>

        <div className="club-tables-grid">
            {/* Recent Events */}
            <div className="club-table-card glass-panel">
                <div className="table-card-header">
                    <h3><Clock size={18} /> Recent Events</h3>
                    <Link to="/club/posted-events" className="view-all-link">View All</Link>
                </div>
                <table className="club-table">
                    <thead>
                        <tr><th>Event Title</th><th>Date</th><th>Status</th><th>Regs</th></tr>
                    </thead>
                    <tbody>
                        {RECENT_EVENTS.map(e => (
                            <tr key={e.id}>
                                <td className="bold">{e.title}</td>
                                <td className="muted">{e.date}</td>
                                <td>
                                    <span className={`status-badge ${e.status.toLowerCase()}`}>
                                        {e.status === 'Approved' && <CheckCircle2 size={12} />}
                                        {e.status === 'Pending' && <Clock size={12} />}
                                        {e.status === 'Rejected' && <XCircle size={12} />}
                                        {e.status}
                                    </span>
                                </td>
                                <td className="bold">{e.registrations}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pending Student Registrations */}
            <div className="club-table-card glass-panel">
                <div className="table-card-header">
                    <h3><Users size={18} /> New Registrations</h3>
                    <Link to="/club/approve-students" className="view-all-link">View All</Link>
                </div>
                <div className="reg-list">
                    {PENDING_REGISTRATIONS.map(r => (
                        <div key={r.id} className="reg-item">
                            <div className="reg-avatar">{r.student.split(' ').map(n => n[0]).join('')}</div>
                            <div className="reg-info">
                                <p className="reg-name">{r.student}</p>
                                <p className="reg-meta">Registered for <span>{r.event}</span> • {r.date}</p>
                            </div>
                            <div className="reg-actions">
                                <button className="icon-btn approve" title="Approve"><CheckCircle2 size={18} /></button>
                                <button className="icon-btn reject" title="Reject"><XCircle size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="quick-stats-bar glass-panel">
            <div className="qs-item">
                <TrendingUp size={20} className="qs-icon teal" />
                <div>
                    <span className="qs-val">85%</span>
                    <span className="qs-lbl">Attendance Rate</span>
                </div>
            </div>
            <div className="qs-divider" />
            <div className="qs-item">
                <Users size={20} className="qs-icon blue" />
                <div>
                    <span className="qs-val">1.2k</span>
                    <span className="qs-lbl">Total Reach</span>
                </div>
            </div>
            <div className="qs-divider" />
            <div className="qs-item">
                <CalendarCheck size={20} className="qs-icon green" />
                <div>
                    <span className="qs-val">24</span>
                    <span className="qs-lbl">Certificates Issued</span>
                </div>
            </div>
        </div>

    </div>
);

export default ClubDashboard;
