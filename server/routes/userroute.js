const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/usercontroller');
const {protectRoute} = require('../middleware/auth.middleware');
//
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signup);
userRouter.get('/logout', userController.logout);
userRouter.post('/onboard', protectRoute, userController.onboard);
userRouter.get('/me', protectRoute,(req,res)=>{
    console.log(req.user ,"in me route")
    res.json(req.user);
});
module.exports = userRouter;