const express = require('express');
const {getAllWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require auth for all workout routes
router.use(requireAuth)

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