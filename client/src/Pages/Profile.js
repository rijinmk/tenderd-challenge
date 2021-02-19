import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../firebase/AuthContext'; 
import { Link, useHistory } from 'react-router-dom'; 

const profile = () => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working
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

    useEffect(() => {
        fetch(`${baseAPI_URL}/api/company/all`)
            .then(data => data.json())
            .then((data) => {
                console.log(data); 
            }); 
    }, []); 

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