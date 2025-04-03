import { useNavigate } from 'react-router-dom';
import './Signup.css'
import React, { useState } from 'react'

const Signup = () => {
    const [profiles, setProfiles] = useState({
        name: "",
        password: ""
    });
    
    const navigate = useNavigate();

    const inputHandler = (e) => {
        setProfiles({ ...profiles, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (profiles.name === "eligo" && profiles.password === "eligo@123") {
            navigate("/memberadmin");
        }
    };

    const { name, password } = profiles;  // ✅ Correct destructuring

    return (
        <div className='signup-page'>
        <div className='signup'>
            <p>Signup</p>
            <form onSubmit={submitHandler}>
                <label>Name:</label>
                <input name="name" value={name} onChange={inputHandler} placeholder="Enter your name broo" />

                <label>Password:</label>
                <input name="password" value={password} onChange={inputHandler} placeholder="Enter the pass said by charan" />

                <center><button type="submit">Login</button></center>
            </form>
        </div>
        </div>
    );
};

export default Signup;
