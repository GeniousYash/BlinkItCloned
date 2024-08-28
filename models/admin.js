const mongoose = require('mongoose');
const Joi = require('joi');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Define Admin Schema for Mongoose
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2, // Minimum length for name
        maxlength: 50 // Maximum length for name
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 5, // Minimum length for email
        maxlength: 100, // Maximum length for email
        match: [emailRegex, 'Invalid email format'] // Email regex validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length for password
        maxlength: 100 // Maximum length for password
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'superadmin'], // Example roles
        default: 'admin' // Default role
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Create Admin Model
const adminModel = mongoose.model('admin', adminSchema);

// Define Joi Validation Schema for Admin Data
const validateAdmin = (adminData) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().pattern(emailRegex).min(5).max(100).required(),
        password: Joi.string().min(6).max(100).required(),
        role: Joi.string().valid('admin', 'superadmin').required()
    });

    return schema.validate(adminData, { abortEarly: false });
};

// Export both the Mongoose Model and Joi Validation Function
module.exports = {
    adminModel,
    validateAdmin
};
