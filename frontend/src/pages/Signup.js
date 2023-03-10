import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading , success} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        await signup(firstName,lastName,phone,email,password)
    }

    return(
        <form className='signup' onSubmit = {handleSubmit}>
            <h3>Sign up</h3>

            <label>First name: </label>
            <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />

            <label>Last name: </label>
            <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />

            <label>Phone: </label>
            <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
            />

            <label>Email: </label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}  
            />

            <label>Password: </label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled = {isLoading} type="submit">Sign up</button>

            {error && <div className='error'>{error}</div>}
            {success && <div className='success'>{success}</div>}

        </form>
    )
}

export default Signup;
