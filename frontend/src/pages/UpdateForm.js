import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { Link } from 'react-router-dom'
import * as React from 'react';

const UpdateForm = () => {
  
  const {workouts,dispatch} = useWorkoutsContext();
  const {id} = useParams();

  const navigate = useNavigate();

  
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
      const  fetchWorkouts = async () => {
          const response = await fetch(`/api/workouts/${id}`)
          const json = await response.json()

          if (response.ok) {
              setTitle(json.title)
              setLoad(json.load)
              setReps(json.reps)
            
          }
      }
      fetchWorkouts()
  },[id])

  const handleSubmit = async (e) => {
      e.preventDefault();

      const response = await fetch(`/api/workouts/${id}`,{
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              title,
              load,
              reps,
              
          })
      })
      const json = await response.json()

      if(!response.ok){
          setError(json.error)
      }

      if (response.ok) {
          dispatch({type: 'UPDATE_WORKOUT', payload: json})                     
      }

      navigate('/');
  }

  return (
    <div className='home'>
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
            <button onClick={() => {
            }}>Update</button>
        </Link>

      
     </div>
    ))}
</div>
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Update Workout</h3>

      <label>Excersize Title:</label>
      <input 
        id='title'
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Load (in kg):</label>
      <input 
        id='load'
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
      />

      <label>Number of Reps:</label>
      <input 
        id='reps'
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
      />

      <button type="submit">Update</button>
      <Link to='/'><button className='cancel'>Cancel</button></Link>

      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default UpdateForm