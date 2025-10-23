const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { upsertUser, generateStreamToken } = require('../model/stram');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.json({ message: "Login successful" });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if(password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address" });
        }
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if(!usernameRegex.test(username)) {
            return res.status(400).json({ message: "Invalid username" });   
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
       const index = Math.floor(Math.random() * 100)+1;
       const randomAvatar=`https://avatar.iran.liara.run/public/${index}.png`;
       const user = await User.create({
        username,
        email,
        password,
        profilePicture: randomAvatar
       });
   try {
    await upsertUser({
        id: user._id,
        name: user.username,
        image: user.profilePicture
       });
       console.log('User upserted successfully');
   } catch (error){
    console.error('Error upserting user:', error);
   }    

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.onboard = async (req, res) => {
    try {
        const {username, nativeLanguage, learningLanguage, location, bio} = req.body;
        if(!username || !nativeLanguage || !learningLanguage || !location || !bio){
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            username,
            nativeLanguage,
            learningLanguage,
            location,
            bio,
            isOnboarded: true
        }, { new: true });
        if(!updatedUser){
            return res.status(404).json({ message: "User not found" });
        }
        try{
            await upsertUser({
                id: updatedUser._id,
                name: updatedUser.username,
                image: updatedUser.profilePicture
            });
            console.log('User upserted successfully');
        } catch (error){
            console.error('Error upserting user:', error);
        }
        res.json({ message: "Onboarding successful" });
    } catch (error) {
        console.error('Onboarding error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}