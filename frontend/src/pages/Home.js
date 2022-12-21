import { useEffect} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { Link } from 'react-router-dom'
//components
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch('/api/workouts')
            const json = await res.json()

            if(res.ok){
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }

        fetchWorkouts();
    }, [dispatch])

    return (
      <div className="home">
        <div className='workouts'>
            {workouts && workouts.map((workout) => (
                 <div className="workout-details" key={workout._id}>
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
                     dispatch({type: 'DELETE_WORKOUT', payload: json})
                    }
                    }
                }>Delete</span>
                <Link to={`/${workout._id}`}>
                    <button>Update</button>
                </Link>

              
             </div>
            ))}
        </div>

        <WorkoutForm />


      </div>
    )
  }
  
  export default Home