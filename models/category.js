const mongoose = require('mongoose');
const Joi = require('joi');

// Define Category Schema for Mongoose
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2, // Minimum length for category name
        maxlength: 50 // Maximum length for category name
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Create Category Model
const categoryModel = mongoose.model('category', categorySchema);

// Define Joi Validation Schema for Category Data
const validateCategory = (categoryData) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required()
    });

    return schema.validate(categoryData, { abortEarly: false });
};

// Export both the Mongoose Model and Joi Validation Function
module.exports = {
    categoryModel,
    validateCategory
};
