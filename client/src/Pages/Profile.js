import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../firebase/AuthContext'; 
import { Link, useHistory } from 'react-router-dom'; 

// Partial Pages
import SelectCompany from './SelectCompany'; 
import RequestList from './RequestsList'; 

const profile = () => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working
    const { currentUser, logout } = useAuth(); 
    const history = useHistory(); 

    const [userHasCompany, setUserHasCompany] = useState(false); 

    const handleLogout = async () => {
        try{
            await logout();  
            history.push("/signin"); 
        } catch(error) {
            console.log(error); 
        }
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentUser)
        };

        fetch(`${baseAPI_URL}/api/user/hasCompany`, requestOptions)
        .then(data => data.json())
        .then((data) => {
            setUserHasCompany(data); 
        }); 

        // fetch(`${baseAPI_URL}/api/company/all`)
        //     .then(data => data.json())
        //     .then((data) => {
        //         console.log(data); 
        //     }); 
    }, []); 

    return(
        <div>
            
            {userHasCompany ? 
                
                <RequestList></RequestList>
                
                :  
                
                <SelectCompany></SelectCompany>
            
            }

            {/* <h2>Profile</h2> */}
            {/* <a href="#" onClick={handleLogout}>Logout</a> */}
            {/* <h5>{currentUser && currentUser.email}</h5> */}
            {/* <Link to="/signup">Sign Up</Link> */}
        </div>
    );
}

export default profile; 