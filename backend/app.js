const express = require("express");
const app = express();
const mongoose = require('mongoose')
const {MONGOURI} = require('./config/keys');
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");


mongoose.connect(MONGOURI)

mongoose.connection.on('connected',()=>{
    console.log('db connected')
})

mongoose.connection.on('error',(err)=>{
    console.log('db error' , err)
})


app.use(express.json())
app.use(cookieParser());

// Route imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1/",product);
app.use("/api/v1/",user);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app