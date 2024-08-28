const mongoose = require('mongoose');
const Joi = require('joi');

// Define Cart Schema for Mongoose
const cartSchema = new mongoose.Schema({
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
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Create Cart Model
const cartModel = mongoose.model('cart', cartSchema);

// Define Joi Validation Schema for Cart Data
const validateCart = (cartData) => {
    const schema = Joi.object({
        user: Joi.string().required(),
        products: Joi.array().items(Joi.string().required()).min(1).required(),
        totalPrice: Joi.number().min(0).required()
    });

    return schema.validate(cartData, { abortEarly: false });
};

// Export both the Mongoose Model and Joi Validation Function
module.exports = {
    cartModel,
    validateCart
};
