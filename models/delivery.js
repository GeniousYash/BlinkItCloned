const mongoose = require('mongoose');
const Joi = require('joi');

// Define Delivery Schema for Mongoose
const deliverySchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to Order model
        required: true
    },
    deliveryBoy: {
        type: String,
        required: true,
        trim: true,
        minlength: 2, // Minimum length for deliveryBoy name
        maxlength: 50 // Maximum length for deliveryBoy name
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'shipped', 'in-transit', 'delivered', 'cancelled'], // Example statuses
        default: 'pending' // Default status
    },
    trackingURL: {
        type: String,
        trim: true,
    },
    estimatedDeliveryTime: {
        type: Number,
        required: true,
        min: 0 // Estimated delivery time should be non-negative
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Create Delivery Model
const deliveryModel = mongoose.model('delivery', deliverySchema);

// Define Joi Validation Schema for Delivery Data
const validateDelivery = (deliveryData) => {
    const schema = Joi.object({
        order: Joi.string().required(),
        deliveryBoy: Joi.string().min(2).max(50).required(),
        status: Joi.string().valid('pending', 'shipped', 'in transit', 'delivered', 'cancelled').required(),
        trackingURL: Joi.string().uri(),
        estimatedDeliveryTime: Joi.number().min(0).required()
    });

    return schema.validate(deliveryData, { abortEarly: false });
};

// Export both the Mongoose Model and Joi Validation Function
module.exports = {
    deliveryModel,
    validateDelivery
};
