const express = require("express");
const app = express();
const mongoose = require('mongoose')
const {MONGOURI} = require('./config/keys');
const errorMiddleware = require("./middleware/error");


mongoose.connect(MONGOURI)

mongoose.connection.on('connected',()=>{
    console.log('db connected')
})

mongoose.connection.on('error',(err)=>{
    console.log('db error' , err)
})


app.use(express.json())

// Route imports

const product = require("./routes/productRoute");

app.use("/api/v1/",product)

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app