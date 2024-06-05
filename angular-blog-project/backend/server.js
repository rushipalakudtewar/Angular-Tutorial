const express = require('express');
const connectDB = require('./db/database');
const app=express();
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv = require('dotenv')
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute")
dotenv.config()
connectDB();

app.use('/api/v1',userRoute)
app.use('/api/v1',blogRoute)
app.listen(`${process.env.PORT}`,()=>{
    console.log(`Listening to the port http://localhost:${process.env.PORT}`);
})

