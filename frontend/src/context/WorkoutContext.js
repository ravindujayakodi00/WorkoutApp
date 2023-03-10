import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
    switch (action.type){
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        //get a single workout
        case 'GET_WORKOUT':
            return {   
                workouts: state.workouts.find((workout) => workout._id === action.payload._id)
            }    
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT':
            return {
                workouts: state.workouts.map((workout) => workout._id === action.payload._id ? action.payload : workout)
            }  
        default:
            return state;
    }
}

export const WorkoutContextProvider = ({ children }) => {

    const [ state, dispatch] = useReducer(workoutReducer, {
        workouts: null,
    })

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
};