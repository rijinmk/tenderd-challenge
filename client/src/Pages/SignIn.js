import React, { useRef, useState } from 'react';
import { useAuth } from '../firebase/AuthContext'; 
import { Link, useHistory } from 'react-router-dom'; 

// Components
import InputType from "./Components/InputType/InputType"; 
import Button from "./Components/Button/Button"; 

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
            console.log("User has LOGGEDIN"); 
        } catch(error) {
            console.log(error);
            setError(error); 
        }
    }

    return(
        <div>
            <h2>Sign In</h2>
            <hr/>
            <form onSubmit={handleSubmit} className="form-container">
                <input type="email" ref={emailRef} placeholder="email"/>
                <input type="password" ref={passwordRef} placeholder="password"/>
                <input type="submit" value="sign in"/>
            </form>
            {/* <Link to="/signup">Sign Up</Link> */}
        </div>
    );
}

export default signIn; 