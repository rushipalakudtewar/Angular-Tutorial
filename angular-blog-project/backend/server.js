const express = require('express');
const connectDB = require('./db/database');
const session = require('express-session')
const app=express();
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const cors = require('cors');
const path = require('path');
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute")
const adminRoute = require("./routes/adminRoute")
const dashboardRoute =require("./routes/dashboardRoute")
app.use(cookieParser())
app.use(cors(
  {
    origin:"http://localhost:4200",
    credentials:true,
  }
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads/blogimages"))
app.use(express.static("uploads/profileimages"))
app.use('/uploads/blogimages', express.static(path.join(__dirname,'uploads/blogimages')));
app.use('/uploads/profileimages', express.static(path.join(__dirname ,'uploads/profileimages')));

dotenv.config()
connectDB();
app.use(session({
    secret: process.env.SESSION_SECRET, // Set your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Adjust as needed (secure: true for HTTPS)
  }));
  
app.use('/api/v1',userRoute)
app.use('/api/v1',blogRoute)
app.use('/api/v1',adminRoute)
app.use('/api/v1',dashboardRoute)

app.listen(`${process.env.PORT}`,()=>{
    console.log(`Listening to the port http://localhost:${process.env.PORT}`);
})

