const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const songwriters = require("../api/routes/songwriters");
const songs = require("../api/routes/songs");

// middleware for logging
app.use(morgan("dev"));

//  parsing middleware
app.use(express.urlencoded({
        extended: true
    }));

// middleware that all request are json
    app.use(express.json());

// Middleware to handlethe CORS policy
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        if(req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "POST,PUT,GET,PATCH,DELETE");
        }
        next();
    });

    app.use("/songwriters", songwriters);
    app.use("/songs", songs);


    app.get("/", (req,res,next) => {
    res.status(201).json({
        message: "Service is up!",
        method: req.method
    });
    });


// Middleware for error handling
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404 ;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error:{
            message: error.message,
            status: error.status,
            method: req.method,
        },
    })
    });

// // connect to mongodb
 mongoose.connect('mongodb://localhost:27017/library', (err) => {
    if (err){
        console.log("Error: ", err.message);
    } else {
        console.log("Mongodb connection successful");
    }
 });

module.exports = app