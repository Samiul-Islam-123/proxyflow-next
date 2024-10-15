const mongoose = require('mongoose');

// Define the schema with unique constraints
const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,  // Enforce unique constraint on username
        required: true // Make it a required field if desired
    },
    email: {
        type: String,
        unique: true,  // Enforce unique constraint on email
        required: true // Make it a required field if desired
    },
    role: {
        type: String,
        default: 'user' // Set a default role or adjust as needed
    },
});

// Create the model
const UserModel = mongoose.model('userdata', schema); // Use a more descriptive model name

module.exports = UserModel;
