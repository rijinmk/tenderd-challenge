import React, { useEffect, useState } from 'react';
import { TimelineLite } from 'gsap';

const selectCompany = (props) => {

    const handleCompanySelection = (e) => {
        document.querySelectorAll('.component-company-card').forEach(elem => {
            elem.classList.remove("selected");
        }); 
        e.target.parentElement.classList.add("selected");
        document.querySelector('.company-selection-done').classList.add('selected'); 
    }

    useEffect(() => {
        let tl = new TimelineLite(); 
        // console.log(props.message.length); 
        // let heightValue = (props.message.length > 38) ? "55px" : "35px";
        tl.to('.component-company-card h4 span', 0.4, {top: "0px"})
          .to('.component-company-card p span', 0.4, {top: "0px"}, "-=0.5")
        //   .to('.component-error-box span', 0.3, {top: "0px"}, 0.2)

    }, []); 

    return(
        <div data-company-card={props.companyId} className="component-company-card">
            <input onChange={handleCompanySelection} type="radio" name="company-card" className="component-company-card__invicible-checkbox"/>
            <div className="component-company-card__image" style={{backgroundImage: `url('${props.image}')`}}></div>
            <h4> <span>{props.name}</span> </h4>
            <p> <span>{props.description}</span> </p>
        </div>
    );
}

export default selectCompany; 