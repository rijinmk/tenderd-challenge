import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../firebase/AuthContext'; 
import { Link, useHistory } from 'react-router-dom'; 
import { TimelineLite } from 'gsap';

// User Defined Component
import CompanyCard from './Components/CompanyCard/CompanyCard'; 

const selectCompany = () => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working

    const [companyCards, setCompanyCards] = useState([]);
    const { currentUser, logout } = useAuth();  
    const history = useHistory(); 

    const handleCompanySelected = () => {
        var selectedID; 
        document.querySelectorAll('.component-company-card').forEach(elem => {
            if(elem.classList.contains("selected")){
                selectedID = elem.dataset.companyCard; 
            }
        }); 

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: currentUser.email, companyID: selectedID})
        };

        fetch(`${baseAPI_URL}/api/user/setCompany`, requestOptions)
             .then(data => {
                return data.json(); 
             })  
             .then(data => {
                history.push("/signin"); 
             })
             .catch(error => {
                console.log(error); 
                console.log("Something went wrong"); 
             }); 
    }

    useEffect(() => {
        fetch(`${baseAPI_URL}/api/company/all`)
            .then(data => data.json())
            .then((data) => {
                let companyCards = []; 
                console.log(data); 
                data.forEach(card => {
                    console.log(card.id); 
                    companyCards.push(<CompanyCard companyId={card.id} key={card.id} name={card.company.name} image={card.company.image} description="this is desc" id=""></CompanyCard>); 
                });
                setCompanyCards(companyCards); 
            }); 
    }, []); 

    return(
        <div className="partial-page--select-company">
            <h3>You haven't selected a company yet</h3>
            <div>
                {companyCards}
            </div>
            <input onClick={handleCompanySelected} className="company-selection-done" type="button" value="Done"/>
        </div>
    );
}

export default selectCompany; 