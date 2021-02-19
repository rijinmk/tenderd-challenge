import React, { useRef, useState }  from 'react';
import { useAuth } from '../firebase/AuthContext'; 
import { Link, useHistory } from 'react-router-dom'; 

// Components
import InputType from "./Components/InputType/InputType"; 
import Button from "./Components/Button/Button"; 

const signUp = () => {

    const emailRef = useRef(); 
    const passwordRef = useRef(); 
    const passwordConfirmRef = useRef(); 

    const { signup } = useAuth(); 

    const [error, setError] = useState(0); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setError('');
            await signup(emailRef.current.value, passwordRef.current.value); 
            console.log("User has LOGGEDIN"); 
            console.log("User has SIGNUP"); 
        } catch(error) {
            console.log(error);
            setError(error); 
        }
    }

    return(
        <div>
            <h2>Sign Up</h2>
            <hr/>
            <form onSubmit={handleSubmit} className="form-container">
                <input type="email" ref={emailRef} placeholder="email"/>
                <input type="password" ref={passwordRef} placeholder="password"/>
                <input type="password" ref={passwordConfirmRef} placeholder="password conf"/>
                <input type="submit" value="sign up"/>
            </form>
            {/* <Link to="/signin">Sign In</Link> */}
        </div>
    );
}

export default signUp; 