const Workout = require('../models/workoutModel');

//get all workouts
const getAllWorkouts = async (req,res) => {
    const workouts = await Workout.find().sort({createdAt: -1});

    res.status(200).json(workouts);
}

//get one workout
const getWorkout = async (req, res) => {

}

//create a workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;

    try{
        const workout = await Workout.create({title, reps, load});
        res.status(200).json(workout);
    }catch(error){
        res.status(402).json({error: error.message});
    }
}

//update a workout
const updateWorkout = async (req, res) => {
    
    }

//delete a workout
const deleteWorkout = async (req, res) => {
        
    }


    
module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}