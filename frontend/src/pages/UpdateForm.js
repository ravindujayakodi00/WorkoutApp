import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
import { Link } from 'react-router-dom'
import * as React from 'react';
import WorkoutDetails from '../components/WorkoutDetails'
import { useAuthContext } from '../hooks/useAuthContext';

const UpdateForm = () => {
  
  const {workouts,dispatch} = useWorkoutsContext();
  const {id} = useParams();
  const { user } = useAuthContext()

  const navigate = useNavigate();

  
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
      const  fetchWorkouts = async () => {
          const response = await fetch(`/api/workouts/${id}` , {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
          })
          const json = await response.json()

          if (response.ok) {
              setTitle(json.title)
              setLoad(json.load)
              setReps(json.reps)
            
          }
      }

      if(user){
          fetchWorkouts();
      }
        fetchWorkouts()
  },[id, user])

  const handleSubmit = async (e) => {
      e.preventDefault();

      if(!user) {
          setError('You must be Logged in')
          return
      }

      const response = await fetch(`/api/workouts/${id}`,{
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`

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
          console.log("Updated SucessFully")
          dispatch({type: 'UPDATE_WORKOUT', payload: json})                     
      }

      navigate('/');
  }

  return (
    <div className='home'>
    <div className='workouts'>
            {workouts && workouts.map((workout) => (
                 <WorkoutDetails key={workout._id} workout={workout} />
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