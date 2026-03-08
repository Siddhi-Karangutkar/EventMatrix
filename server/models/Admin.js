const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        default: 'admin@gmail.com'
    },
    password: {
        type: String,
        required: true,
        default: 'admin'
    },
    collegeCode: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
