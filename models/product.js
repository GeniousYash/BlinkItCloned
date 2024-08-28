const mongoose = require('mongoose');
const Joi = require('joi');

// Define Product Schema for Mongoose
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3, // Minimum length for name
        maxlength: 100 // Maximum length for name
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Price should be non-negative
    },
    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3, // Minimum length for category
        maxlength: 50 // Maximum length for category
    },
    stock: {
        type: Boolean,
        required: true // Indicates if the product is in stock
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Create Product Model
const productModel = mongoose.model('product', productSchema);

// Define Joi Validation Schema for Product Data
const validateProduct = (productData) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().min(0).required(),
        category: Joi.string().min(3).max(50).required(),
        stock: Joi.boolean().required(),
        description: Joi.string().optional(),
        image: Joi.string().optional()
    });

    return schema.validate(productData, { abortEarly: false });
};

// Export both the Mongoose Model and Joi Validation Function
module.exports = {
    productModel,
    validateProduct
};
