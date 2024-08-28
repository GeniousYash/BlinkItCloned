const mongoose = require('mongoose');
const Joi = require('joi');

// Define Order Schema for Mongoose
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Assuming you have a Product model
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0 // Total price should be non-negative
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 5, // Minimum length for address
        maxlength: 300 // Maximum length for address
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'], // Example statuses
        default: 'pending' // Default status
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment' // Reference to Payment model
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery' // Reference to Delivery model
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Create Order Model
const orderModel = mongoose.model('order', orderSchema);

// Define Joi Validation Schema for Order Data
const validateOrder = (orderData) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        products: Joi.array().items(Joi.string().required()).min(1).required(),
        totalPrice: Joi.number().min(0).required(),
        address: Joi.string().min(5).max(200).required(),
        status: Joi.string().valid('pending', 'processed', 'shipped', 'delivered', 'cancelled').required(),
        payment: Joi.string().allow(null, ''), // Optional field, can be null or empty
        delivery: Joi.string().allow(null, '') // Optional field, can be null or empty
    });

    return schema.validate(orderData, { abortEarly: false });
};

// Export both the Mongoose Model and Joi Validation Function
module.exports = {
    orderModel,
    validateOrder
};
