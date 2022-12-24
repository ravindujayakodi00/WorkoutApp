import { useState } from 'react';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(firstName, lastName, phone, email, password );
    }

    return(
        <form className='signup' onSubmit = {handleSubmit}>
            <h3>Sign up</h3>

            <label>First name: </label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <label>Last name: </label>
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <label>Phone: </label>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <label>Email: </label>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />

            <label>Password: </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Sign up</button>
        </form>
    )
}

export default Signup;
