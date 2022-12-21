//import npm packages
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//import local files
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

//create express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

//connect to database
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGOURI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to the DB & listening on port", process.env.PORT);
        })
    })
    .catch((error)=> {
        console.log("error connecting to database", error);
    });

