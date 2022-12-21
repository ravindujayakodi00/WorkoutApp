import React from 'react'
import { Link } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    
    return (
        <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{workout.createdAt}</p>
        <span onClick={async () => {
            const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE'
            })
            const json = await response.json()
    
            if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
            }
        }}>Delete</span>
        <Link to={`/${workout._id}`}>
            <button>Update</button>
        </Link>
        </div>
    )
}

export default WorkoutDetails