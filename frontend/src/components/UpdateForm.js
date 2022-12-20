import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UpdateForm = () => {

    const { id } = useParams();
    const [workout, setWorkout] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/workouts/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setWorkout(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.message);
            })
    }, [id]);

    return (
        <div className="update">
            { error && <div>{ error }</div> }
            { isLoading && <div>Loading...</div> }
            { workout && (
                <div>
                    <h2>{ workout.title }</h2>
                    <p>Written by { workout.author }</p>
                    <div>{ workout.body }</div>
                </div>
            )}
        </div>
    );
}

export default UpdateForm;