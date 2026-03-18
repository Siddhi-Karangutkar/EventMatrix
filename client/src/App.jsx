import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout & Landing
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';

// Student Portal
import StudentLogin from './pages/Auth/StudentLogin';
import StudentRegister from './pages/Auth/StudentRegister';
import StudentLayout from './pages/StudentDashboard/StudentLayout';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import StudentNotifications from './pages/StudentDashboard/StudentNotifications';
import BrowseEvents from './pages/BrowseEvents/BrowseEvents';
import RegisteredEvents from './pages/StudentDashboard/RegisteredEvents';
import AttendedEvents from './pages/StudentDashboard/AttendedEvents';
import {
  StudentProfile,
} from './pages/StudentDashboard/Placeholders';

// Admin Portal
import AdminLogin from './pages/Admin/AdminLogin';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminCollegeCode from './pages/Admin/AdminCollegeCode';
import ApproveClubs from './pages/Admin/ApproveClubs';
import ApproveEvents from './pages/Admin/ApproveEvents';
import EventsConducted from './pages/Admin/EventsConducted';
import {
  AdminStudents,
  AdminClubs,
  AdminEvents,
  AdminProfile,
} from './pages/Admin/AdminPlaceholders';

// Club Portal
import ClubLogin from './pages/Club/ClubLogin';
import ClubRegister from './pages/Club/ClubRegister';
import ClubLayout from './pages/Club/ClubLayout';
import ClubDashboard from './pages/Club/ClubDashboard';
import CreateEvent from './pages/Club/CreateEvent';
import EditEvent from './pages/Club/EditEvent';
import ClubEventStatus from './pages/Club/ClubEventStatus';
import ClubNotifications from './pages/Club/ClubNotifications';
import ClubApproveStudents from './pages/Club/ApproveStudents';
import ClubAttendance from './pages/Club/ClubAttendance';
import {
  ClubPostedEvents,
  ClubCertificates,
  ClubAnnouncements,
  ClubFeedback,
  ClubBudget,
  ClubProfile,
} from './pages/Club/ClubPlaceholders';

/* ── Wrappers ─────────────────────────────────────────────── */
const LandingPage = () => (
  <>
    <Navbar />
    <Hero />
    <Features />
    <Footer />
  </>
);

const AuthWrapper = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

/* ── App ──────────────────────────────────────────────────── */
function App() {
  return (
    <Router>
      <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Student Auth */}
        <Route path="/student/login" element={<AuthWrapper><StudentLogin /></AuthWrapper>} />
        <Route path="/student/register" element={<AuthWrapper><StudentRegister /></AuthWrapper>} />

        {/* Student Portal */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="notifications" element={<StudentNotifications />} />
          <Route path="browse" element={<BrowseEvents />} />
          <Route path="registered" element={<RegisteredEvents />} />
          <Route path="attended" element={<AttendedEvents />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>

        {/* Admin Auth */}
        <Route path="/admin/login" element={<AuthWrapper><AdminLogin /></AuthWrapper>} />

        {/* Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="clubs" element={<AdminClubs />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="approve-clubs" element={<ApproveClubs />} />
          <Route path="approve-events" element={<ApproveEvents />} />
          <Route path="conducted-events" element={<EventsConducted />} />
          <Route path="college-code" element={<AdminCollegeCode />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Club Auth */}
        <Route path="/club/login" element={<AuthWrapper><ClubLogin /></AuthWrapper>} />
        <Route path="/club/register" element={<AuthWrapper><ClubRegister /></AuthWrapper>} />

        {/* Club Portal */}
        <Route path="/club" element={<ClubLayout />}>
          <Route path="dashboard" element={<ClubDashboard />} />
          <Route path="notifications" element={<ClubNotifications />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="edit-event/:id" element={<EditEvent />} />
          <Route path="posted-events" element={<ClubPostedEvents />} />
          <Route path="event-status" element={<ClubEventStatus />} />
          <Route path="approve-students" element={<ClubApproveStudents />} />
          <Route path="certificates" element={<ClubCertificates />} />
          <Route path="announcements" element={<ClubAnnouncements />} />
          <Route path="feedback" element={<ClubFeedback />} />
          <Route path="budget" element={<ClubBudget />} />
          <Route path="attendance" element={<ClubAttendance />} />
          <Route path="profile" element={<ClubProfile />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
