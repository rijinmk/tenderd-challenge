import React, { useRef, useState } from 'react';
import { useAuth } from '../firebase/AuthContext'; 
import { Link, useHistory } from 'react-router-dom'; 

const profile = () => {

    const { currentUser, logout } = useAuth(); 
    const history = useHistory(); 


    const handleLogout = async () => {
        try{
            await logout();  
            history.push("/signin"); 
        } catch(error) {
            console.log(error); 
        }
    }

    return(
        <div>
            <h2>Profile</h2>
            <a href="#" onClick={handleLogout}>Logout</a>
            <h5>{currentUser && currentUser.email}</h5>
            {/* <Link to="/signup">Sign Up</Link> */}
        </div>
    );
}

export default profile; 