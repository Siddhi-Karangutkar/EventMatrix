require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
// Dynamic CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL?.replace(/\/$/, ""), // Remove trailing slash if present
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

console.log("-----------------------------------------");
console.log("Server Config: Port 5001, CORS Enabled");
console.log("-----------------------------------------");

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const eventRoutes = require('./routes/events');
const registrationRoutes = require('./routes/registrations');
const notificationRoutes = require('./routes/notifications');
const announcementRoutes = require('./routes/announcements');
const budgetRoutes = require('./routes/budget');
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/admin-notifications', require('./routes/adminNotifications'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/student', require('./routes/student'));
app.use('/api/club', require('./routes/club'));

// Basic Route for testing
app.get("/", (req, res) => {
    res.send("EventMatrix API is running!");
});

// Catch-all 404 Logger
app.use((req, res) => {
    console.log(`[404 Error] ${req.method} ${req.originalUrl} - Not Found`);
    res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
