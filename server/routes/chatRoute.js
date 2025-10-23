const express=require('express')
const {protectRoute} = require('../middleware/auth.middleware');
const chatcontroller=require('../controller/chatcontroller');
const chatRouter=express.Router();
chatRouter.use(protectRoute);
chatRouter.get('/token/:id',chatcontroller.getstreamtoken)





module.exports=chatRouter;