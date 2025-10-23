const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
    },
    nativeLanguage: {
        type: String
    },
    learningLanguage: {
        type: String,
    },
    location: {
        type: String,
        required: false
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    friends: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
}, { timestamps: true });
//password hashing
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);



module.exports = User;