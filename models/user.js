const mongoose = require('mongoose');
const Joi = require('joi');

// Define Address Schema for Mongoose
const AddressSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
        trim: true,
        minlength: 2, // Minimum length for state
        maxlength: 100 // Maximum length for state
    },
    zip: {
        type: Number,
        required: true,
        min: 10000, // Minimum value for zip
        max: 999999 // Maximum value for zip
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 2, // Minimum length for city
        maxlength: 100 // Maximum length for city
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5, // Minimum length for address
        maxlength: 300 // Maximum length for address
    }
}, { _id: false }); // Disable _id for embedded documents

// Define User Schema for Mongoose
const userSchema = new mongoose.Schema({
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
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum length for password
        maxlength: 50 // Maximum length for password
    },
    phone: {
        type: Number,
        required: true,
        match: /^\d{10}$/, // 10-digit phone number
    },
    addresses: {
        type: [AddressSchema],
    }
}, { timestamps: true });

// Create User Model
const userModel = mongoose.model('user', userSchema);

// Define Joi Validation Schema for User Data
const validateUser = (userData) => {
    const addressSchema = Joi.object({
        state: Joi.string().min(2).max(100).required(),
        zip: Joi.number().integer().min(1000).max(999999).required(),
        city: Joi.string().min(2).max(100).required(),
        address: Joi.string().min(5).max(200).required()
    });

    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().min(5).max(100).required(),
        password: Joi.string().min(6).max(100).required(),
        phone: Joi.string().pattern(/^\d{10}$/).required(),
        addresses: Joi.array().items(addressSchema).min(1).required()
    });
    return schema.validate(userData, { abortEarly: false });
};

module.exports = {
    userModel,
    validateUser
};
