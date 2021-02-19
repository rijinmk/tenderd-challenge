import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../firebase/AuthContext'; 
import { Link, useHistory } from 'react-router-dom'; 
import { TweenLite } from "gsap";

// User Build Components
import ErrorBox from './Components/ErrorBox/ErrorBox'; 

const signIn = () => {
    const emailRef = useRef(); 
    const passwordRef = useRef(); 

    const { signin } = useAuth(); 

    const [error, setError] = useState(0); 

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setError('');
            await signin(emailRef.current.value, passwordRef.current.value); 
            history.push("/profile");
        } catch(error) {
            setError(error.message); 
        }
    }

    useEffect(() => {
        TweenLite.staggerTo('.signin-signup label span', 0.4, {top: "0px"}, 0.2); 
    }, []); 

    return(
        <div className="signin-signup">
            <h2>Sign In</h2>
            <hr/>
            {error ? <ErrorBox message={error} /> : ''}
            <form onSubmit={handleSubmit} className="form-container">
                <label> <span>Email</span> </label>
                <input type="email" ref={emailRef}/>
                <label> <span>Password</span> </label>
                <input type="password" ref={passwordRef}/>
                <input type="submit" value="Sign In"/>
            </form>

            <div className="form-link">
                Dont have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
}

export default signIn; 