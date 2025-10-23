const express = require('express');
const trackeritemcontroller=require('../controller/trackitemcontroller')
const trackerRouter = express.Router();
trackerRouter.post('/tracker',trackeritemcontroller.postitem);
trackerRouter.get('/tracker',trackeritemcontroller.getitem)
trackerRouter.post('/tracker/delete',trackeritemcontroller.deleteitem)
module.exports = trackerRouter;