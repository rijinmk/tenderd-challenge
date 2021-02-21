import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free-solid'
import { TimelineLite } from 'gsap'; 
import { useAuth } from '../../../firebase/AuthContext'; 
import { Link, useHistory } from 'react-router-dom'; 

const navbar = (props) => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working
    const [company, setCompany] = useState();  
    const { logout } = useAuth(); 
    const history = useHistory(); 

    const handleLogout = async () => {
        try{
            await logout();  
            history.push("/signin"); 
        } catch(error) {
            console.log(error); 
        }
    }

    useEffect(async () => {
        console.log({props}); 
        console.log(`${baseAPI_URL}/api/company/select/${props.company}`); 
        let getCompany = await fetch(`${baseAPI_URL}/api/company/select/${props.company}`); 
        getCompany = await getCompany.json(); 
        setCompany(getCompany);

        let tl = new TimelineLite(); 
        tl.staggerTo('.welcome-back span', 0.8, {top: "0px"}, 0.1)
          .staggerTo('.welcome-back span', 0.8, {delay: 3, top: "100px"}, 0.1)
        setTimeout(() => {
            if(document.querySelector('.welcome-back')){
                document.querySelector('.welcome-back').innerHTML = `<span>${getCompany.name}<span>`;
                tl.staggerTo('.welcome-back span', 0.8, {top: "0px"}, 0.1)
            }
        }, 5100);
    }, []); 

    return(
        <div className="component-navbar">
            <div className="component-navbar-user-info">
                <div className="hello-image" style={{backgroundImage: `url('https://cdn.dribbble.com/users/1714010/screenshots/7102658/media/4e537b1cfa17cbbe069e5736eb2cb1e7.gif')`}}></div>
                <div>
                    <div className="welcome-back"> <span>Welcome</span> <span>Back</span> </div>
                    <h4>{props.name}</h4>
                </div>
            </div>

            <div className="component-navbar-settings">
                <div className="logout-btn" onClick={handleLogout}><FontAwesomeIcon icon="sign-out-alt" /></div>
                <div className="settings-btn"><FontAwesomeIcon icon="cogs" /></div>
                <div className="add-request-btn"> <Link to="/add-request"><FontAwesomeIcon icon="plus" /></Link> </div>
            </div>
        </div>
    ); 
}

export default navbar; 