require('dotenv').config();
console.log(process.env.PORT); // 3001
console.log(process.env.MONGO_URL); // mongodb://localhost:27017/mydatabase 
console.log(process.env.JWT_SECRET); // mydatabase
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors'); 
const mongoose = require('mongoose');
const trackerRouter = require('./routes/trackitemroute');
const userRouter = require('./routes/userroute'); 
const memberRouter = require('./routes/member');
const chatRouter=require('./routes/chatRoute');
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//cors
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // fallback for development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // if you're using cookies or sessions
  }));
//connect to db
  mongoose.connect(process.env.MONGO_URL)
  .then(() =>{
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));

app.use('/',trackerRouter);
app.use('/loginorsignup',userRouter);
app.use('/member',memberRouter);
app.use('/chat',chatRouter);





