/* backend oblig2 maja */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: true 
    },
    surname: { 
        type: String, 
        required: true 
    },
    email: {
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    department: {
        type: String, 
        required: true 
        },
    university: { 
        type: String, 
        required: true 
    },
    position: { 
        type: String, enum: ['Teacher', 'Student', 'TA'], 
        required: true 
    },
    role: {
        type: String, enum: ['Admin', 'User'],
        required: true
    }
},
{
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema, "users");