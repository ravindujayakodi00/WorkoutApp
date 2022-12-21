const { default: mongoose } = require('mongoose');
const Workout = require('../models/workoutModel');

//get all workouts
const getAllWorkouts = async (req,res) => {
    const workouts = await Workout.find().sort({createdAt: -1});

    res.status(200).json(workouts);
}

//get one workout
const getWorkout = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a workout'});
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: 'No such a workout'});
    }

    res.status(200).json(workout);
}

//create a workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

    let emptyFields = [];

    if(!title) {
        emptyFields.push('title');
    }

    if(!reps) {
        emptyFields.push('reps');
    }

    if(!load) {
        emptyFields.push('load');
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all fields', emptyFields});
    }

    try{
        const workout = await Workout.create({title, reps, load});
        res.status(200).json(workout);
    }catch(error){
        res.status(402).json({error: error.message});
    }
}

//update a workout
const updateWorkout = async (req,res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a workout'});
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(404).json({error: 'No such a workout'});
    }

    res.status(200).json(workout);
}

//delete a workout
const deleteWorkout = async (req,res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a workout'});
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout) {
        return res.status(404).json({error: 'No such a workout'});
    }

    res.status(200).json(workout);
}


    
module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}