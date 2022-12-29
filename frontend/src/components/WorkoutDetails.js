import React from 'react'
import { Link } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { useNavigate } from 'react-router-dom'
import { FaEdit} from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import  FormatDistancetToNow  from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleDelete = async () => {

        if(!user) {
            return
        }

        const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
        })
        const json = await response.json()

        if (response.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }

        navigate('/')
    }

    
    return (
        <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p>{FormatDistancetToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
        <span className='delete' onClick={handleDelete}><FaTrashAlt/></span>
        <Link to={`/${workout._id}`}>
            <span className='update'><FaEdit/></span>
        </Link>
        </div>
    )
}

export default WorkoutDetails