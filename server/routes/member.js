const express = require('express');
const memberRouter = express.Router();
const {protectRoute} = require('../middleware/auth.middleware');
const memberController = require('../controller/membercontroller');

memberRouter.use(protectRoute);
memberRouter.get('/recc/',memberController.getrecommendedmembers);
memberRouter.get('/friends/:id',memberController.getmyfriends)
memberRouter.post('/friend-req/',memberController.sendFriendreq);
memberRouter.put('/friend-req/:id',memberController.acceptFriendreq);
memberRouter.get('/friend-request/:id',memberController.getfriendrequests);
memberRouter.get('/outgoing/:id',memberController.getoutgoingfriendreq);

module.exports = memberRouter;
