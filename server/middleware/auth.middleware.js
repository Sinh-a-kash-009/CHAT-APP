const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.protectRoute = async(req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        console.log("recieved token of the current user",token);
        if(!token){
            return res.status(401).json({ message: "Unauthorized-no token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({ message: "Unauthorized-invalid token" });
        }
        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            return res.status(401).json({ message: "Unauthorized-user not found" });
        }
        req.user = user;
        console.log("user in auth middleware",req.user);
        next();
    } catch (error) {
        console.error('Error in protectRoute middleware:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}