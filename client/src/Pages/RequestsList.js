import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase/AuthContext'; 

// User defined Components
import Navbar from './Components/Navbar/Navbar'; 
import RequestTable from './Components/RequestsTable/RequestTable';

const requestList = () => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working
    const { currentUser } = useAuth(); 
    const [userData, setUserData] = useState(); 

    useEffect(() => {
        fetch(`${baseAPI_URL}/api/user/user/${currentUser.email}`)
             .then(data => {
                return data.json()
             })
             .then(data => {
                console.log("GOT USER DATA", data); 
                setUserData(data); 
             })
             .catch(error => {
                console.log(error); 
             }) 
    }, []); 

    return(
        <div className="partial-page-req-list">
            {userData && <Navbar email={userData.email} company={userData.company} name={userData.name}></Navbar>}
        
            <div className="my-4">
                <hr/>
                {userData && <RequestTable company={userData.company}></RequestTable>}
            </div>

        </div>
    );
}

export default requestList; 