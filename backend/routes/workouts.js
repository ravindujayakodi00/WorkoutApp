const express = require('express');
const {getAllWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout} = require('../controllers/workoutController');

const router = express.Router();

//get all workouts
router.get('/', getAllWorkouts);

//get one workout
router.get('/:id', getWorkout);

//create a workout
router.post('/', createWorkout);

//update a workout
router.patch('/:id', updateWorkout);

//delete a workout
router.delete('/:id', deleteWorkout);


module.exports = router;