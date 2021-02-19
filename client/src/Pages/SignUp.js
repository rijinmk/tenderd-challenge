import React, { useRef, useState, useEffect }  from 'react';
import { useAuth } from '../firebase/AuthContext'; 
import { Link, useHistory } from 'react-router-dom'; 
import { TweenLite } from "gsap";

// User Build Components
import ErrorBox from './Components/ErrorBox/ErrorBox'; 

const signUp = () => {

    const emailRef = useRef(); 
    const passwordRef = useRef(); 
    const passwordConfirmRef = useRef(); 

    const { signup } = useAuth(); 

    const [error, setError] = useState(0); 
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setError('');
            console.log(passwordRef.current.value, passwordConfirmRef.current.value); 
            if(passwordRef.current.value !== passwordConfirmRef.current.value){
                return setError("Passwords don't match"); 
            }
            await signup(emailRef.current.value, passwordRef.current.value); 
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
            <h2>Sign Up</h2>
            <hr/>
            {error ? <ErrorBox message={error} /> : ''}
            <form onSubmit={handleSubmit} className="form-container">
                <label> <span>Email</span> </label>
                <input type="email" ref={emailRef}/>
                <label> <span>Password</span> </label>
                <input type="password" ref={passwordRef}/>
                <label> <span>Confirm Password</span>  </label>
                <input type="password" ref={passwordConfirmRef}/>
                <input type="submit" value="Sign Up"/>
            </form>
            
            <div className="form-link">
               Already have an account? <Link to="/signin">Sign In</Link>
            </div>
        </div>
    );
}

export default signUp; 