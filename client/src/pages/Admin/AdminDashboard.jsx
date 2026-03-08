import React from 'react';
import {
    Users, Building2, CalendarCheck, Clock,
    AlertTriangle, TrendingUp, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

// ── Mock data ─────────────────────────────────────────────
const STATS = [
    { label: 'Registered Students', value: 1_240, icon: <Users size={26} />, color: 'blue', link: '/admin/students' },
    { label: 'Registered Clubs', value: 18, icon: <Building2 size={26} />, color: 'purple', link: '/admin/clubs' },
    { label: 'Approved Events', value: 45, icon: <CalendarCheck size={26} />, color: 'green', link: '/admin/events' },
    { label: 'Pending Approval', value: 7, icon: <Clock size={26} />, color: 'orange', link: '/admin/approve-events' },
];

const PENDING_CLUBS = [
    { id: 1, name: 'Robotics Club', head: 'Arjun Mehta', date: 'Mar 04, 2026' },
    { id: 2, name: 'Literary Society', head: 'Priya Singh', date: 'Mar 05, 2026' },
    { id: 3, name: 'Finance Club', head: 'Rohit Patel', date: 'Mar 06, 2026' },
];

const PENDING_EVENTS = [
    { id: 1, title: 'Hackathon Sprint', club: 'DSC', date: 'Apr 10, 2026', type: 'Paid' },
    { id: 2, title: 'Poetry Slam Night', club: 'Literary Soc.', date: 'Apr 14, 2026', type: 'Free' },
    { id: 3, title: 'Financial Literacy Talk', club: 'Finance Club', date: 'Apr 16, 2026', type: 'Free' },
    { id: 4, title: 'Robotics Demo Day', club: 'Robotics Club', date: 'Apr 22, 2026', type: 'Free' },
];

const AdminDashboard = () => (
    <div className="admin-dash animate-fade-in">

        {/* Header */}
        <div className="admin-dash-header">
            <div>
                <h1 className="dashboard-title">Admin Dashboard</h1>
                <p className="dashboard-subtitle">Manage your college events ecosystem.</p>
            </div>
            <div className="header-alert">
                <AlertTriangle size={16} />
                <span>{STATS[3].value} events awaiting approval</span>
            </div>
        </div>

        {/* Stat Cards */}
        <div className="admin-stats-grid">
            {STATS.map((s, i) => (
                <Link to={s.link} key={i} className={`admin-stat-card glass-panel accent-${s.color}`}>
                    <div className={`astat-icon ${s.color}`}>{s.icon}</div>
                    <div className="astat-info">
                        <span className="astat-value">{s.value.toLocaleString()}</span>
                        <span className="astat-label">{s.label}</span>
                    </div>
                    <ArrowRight size={18} className="astat-arrow" />
                </Link>
            ))}
        </div>

        {/* Two-column: Pending Clubs + Pending Events */}
        <div className="admin-tables-grid">

            {/* Pending Clubs */}
            <div className="admin-table-card glass-panel">
                <div className="table-card-header">
                    <h3><Building2 size={18} /> Clubs Awaiting Approval</h3>
                    <Link to="/admin/approve-clubs" className="view-all-link">View All</Link>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr><th>Club Name</th><th>Head</th><th>Applied</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {PENDING_CLUBS.map(c => (
                            <tr key={c.id}>
                                <td className="bold">{c.name}</td>
                                <td>{c.head}</td>
                                <td className="muted">{c.date}</td>
                                <td>
                                    <div className="action-btns">
                                        <button className="action-btn approve">Approve</button>
                                        <button className="action-btn reject">Reject</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pending Events */}
            <div className="admin-table-card glass-panel">
                <div className="table-card-header">
                    <h3><Clock size={18} /> Events Awaiting Approval</h3>
                    <Link to="/admin/approve-events" className="view-all-link">View All</Link>
                </div>
                <table className="admin-table">
                    <thead>
                        <tr><th>Title</th><th>Club</th><th>Date</th><th>Type</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {PENDING_EVENTS.map(e => (
                            <tr key={e.id}>
                                <td className="bold">{e.title}</td>
                                <td className="muted">{e.club}</td>
                                <td className="muted">{e.date}</td>
                                <td>
                                    <span className={`type-badge ${e.type.toLowerCase()}`}>{e.type}</span>
                                </td>
                                <td>
                                    <div className="action-btns">
                                        <button className="action-btn approve">Approve</button>
                                        <button className="action-btn reject">Reject</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Quick stats bar */}
        <div className="quick-stats-bar glass-panel">
            <div className="qs-item">
                <TrendingUp size={20} className="qs-icon green" />
                <div>
                    <span className="qs-val">92%</span>
                    <span className="qs-lbl">Event approval rate</span>
                </div>
            </div>
            <div className="qs-divider" />
            <div className="qs-item">
                <Users size={20} className="qs-icon blue" />
                <div>
                    <span className="qs-val">68%</span>
                    <span className="qs-lbl">Student participation</span>
                </div>
            </div>
            <div className="qs-divider" />
            <div className="qs-item">
                <CalendarCheck size={20} className="qs-icon purple" />
                <div>
                    <span className="qs-val">45</span>
                    <span className="qs-lbl">Events this semester</span>
                </div>
            </div>
            <div className="qs-divider" />
            <div className="qs-item">
                <Building2 size={20} className="qs-icon orange" />
                <div>
                    <span className="qs-val">18</span>
                    <span className="qs-lbl">Active clubs</span>
                </div>
            </div>
        </div>

    </div>
);

export default AdminDashboard;
