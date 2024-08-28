const mongoose = require('mongoose');
const Joi = require('joi');

// Define Payment Schema for Mongoose
const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to Order model
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0 // Amount should be non-negative
    },
    method: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    transactionID: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Create Payment Model
const paymentModel = mongoose.model('payment', paymentSchema);

// Define Joi Validation Schema for Payment Data
const validatePayment = (paymentData) => {
    const schema = Joi.object({
        order: Joi.string().required(),
        amount: Joi.number().min(0).required(),
        method: Joi.string().required(),
        status: Joi.string().required(),
        transactionID: Joi.string().required()
    });

    return schema.validate(paymentData, { abortEarly: false });
};

// Export both the Mongoose Model and Joi Validation Function
module.exports = {
    paymentModel,
    validatePayment
};
