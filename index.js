// 
// redis DB
// postman - helps in knowing the post methods worked or not.(testing post api)

// installing - npm i express mongoose dotenv

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
import express from "express";// to use import instead of require use "type": "module" in package.json
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blog.routes.js";//mention .js when using type module in express
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();
app.use(express.json());//initiates the sharing of json data from postman(tester or frontend) to server and viseversa
app.use(cookieParser());
app.use(cors({//initiates the cross origin resource sharing
    origin:["http://localhost:3000"],// mention the origin 
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],//mention the methods that will be used from cross origin
    credentials: true
}))

app.use("/api/v1/blog",blogRouter);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);

app.get("/",(req,res,next) => {
    res.send(`Server running on ${process.env.PORT}`);
})

const connectDB = async()=>{
    try{
        let dbConnect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connected to DB`)
    }
    catch(err){
        console.log(`Unable to connect : ${err}`);
    }
}


connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log("listening on 8000");
    });
})


// postman testing

// body - helps in sending the data from frontend to server