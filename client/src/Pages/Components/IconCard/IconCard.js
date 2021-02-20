import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free-solid'
import { TimelineLite } from 'gsap';

const addRequests = (props) => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working
    const handleTypeSelection = (e) => {
        document.querySelectorAll(`.container-for-${props.groupName}`).forEach(elem => {
            elem.classList.remove("selected");
        }); 
        e.target.parentElement.classList.add("selected");
    }

    useEffect(async () => {   
        let tl = new TimelineLite;
        tl.to('.icon-holder', 0.5, {transform: 'translate(0px)'})
          .to('.title-holder span', 0.3, {top: "0px"}, 0.3);  
    }, []); 

    return (
        <div>
            <div data-companyid={props.companyid} className={`component-icon-card component-icon-card--${props.type} container-for-${props.groupName}`}>
            <input value={props.radioval} onChange={handleTypeSelection} type="radio" name={props.groupName} className="component-icon-card__invicible-checkbox"/>
                <div className="icon-holder"><FontAwesomeIcon icon={props.icon} /></div>
                <div className="title-holder"> <span>{props.title}</span> </div>
            </div>
        </div>
    ); 
}

export default addRequests; 