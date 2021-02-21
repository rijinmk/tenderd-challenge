import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import IconCard from './Components/IconCard/IconCard'; 
import Timeline from './Components/Timeline/Timeline'; 
import { Link, useHistory } from 'react-router-dom'; 

const editRequest = () => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working
    const requestID = window.location.search.replace('?',''); 
    const [request, setRequest] = useState(); 
    const [heightOfApp, setHeightOfApp] = useState();
    const history = useHistory(); 

    const editRequest = async (e) => {

        e.target.style.opacity = 0.3; 
        e.target.style.cursor = "not-allowed"; 
        e.target.setAttribute('disabled', 'true'); 

        let type = document.querySelector("input[name='type-of-request']:checked");
        let status = document.querySelector("input[name='status-of-request']:checked");
        let description = document.querySelector(".desc-container textarea"); 
        console.log(type, status, description); 

        // Checking if the user has changed anything
        console.log("Checking ---> ", type.value, request.type)
        if(type.value === request.type && status.value === request.status && description.value === request.description){
            alert("You haven't changed anything"); 
            e.target.style.opacity = 1; 
            e.target.style.cursor = "pointer"; 
            e.target.removeAttribute('disabled'); 
        }else{
            console.log("Sending edit request"); 
            await fetch(`${baseAPI_URL}/api/request/edit?id=${requestID}&type=${type.value}&status=${status.value}&description=${description.value}`)
            setTimeout(() => {
                history.push("/"); 
            }, 500); 
        }
    }

    useEffect( async () => {
        let requestData = await fetch(`${baseAPI_URL}/api/request/${requestID}`);
        requestData = await requestData.json(); 
        setRequest(requestData); 
        console.log(requestData); 

        // Setting the type
        let typeOfRequestIconCards = document.querySelectorAll('.container-for-type-of-request'); 
        typeOfRequestIconCards.forEach(e => {
            let radioButton = e.children[0]; 
            if(radioButton.value === requestData.type){
                radioButton.click(); 
            } 
        }); 

        // Setting the description
        document.querySelector('.desc-container textarea').value = requestData.description;

        // Setting the Status
        let lastKnownStatus = requestData.history; 
        lastKnownStatus = lastKnownStatus[lastKnownStatus.length-1].status;
        let statusOfRequestIconCards = document.querySelectorAll('.container-for-status-of-request'); 
        statusOfRequestIconCards.forEach(e => {
            let radioButton = e.children[0]; 
            if(radioButton.value === lastKnownStatus){
                radioButton.click(); 
            } 
        }); 

        let setTopValue = document.querySelector('.App.container').offsetHeight / 4 + "px"; 
        setHeightOfApp({padding: "100px 0px", position: "relative", top: setTopValue}); 

    }, []); 

    return (
        <div style={heightOfApp}>
            <h1>Edit Request</h1>
            {request && console.log("This is from JSX", request.history)}
            <h4 className="mt-5 mb-3">Type of Request</h4>
            <div className="form-section icon-container type-of-requests">
                <IconCard groupName="type-of-request" radioval="Breakdown" title="Breakdown" type="big" icon="unlink"></IconCard>
                <IconCard groupName="type-of-request" radioval="Maintenance" title="Maintenance" type="big" icon="truck-loading"></IconCard>
                <IconCard groupName="type-of-request" radioval="Replacement" title="Replacement" type="big" icon="truck"></IconCard>
                <IconCard groupName="type-of-request" radioval="Demobilisation" title="Demobilisation" type="big" icon="not-equal"></IconCard>
            </div>

            <h4 className="mt-5 mb-3">Description</h4>
            <div className="form-section desc-container">
                <textarea></textarea>
            </div>

            <h4 className="mt-5 mb-3">Status</h4>
            <div className="form-section icon-container">
                <IconCard groupName="status-of-request" radioval="Created" title="Created" type="small" icon="plus-circle"></IconCard>
                <IconCard groupName="status-of-request" radioval="In Progress" title="In Progress" type="small" icon="spinner"></IconCard>
                <IconCard groupName="status-of-request" radioval="Completed" title="Completed" type="small" icon="check"></IconCard>
                <IconCard groupName="status-of-request" radioval="Cancelled" title="Cancelled" type="small" icon="times"></IconCard>
            </div>

            <h4 className="mt-5 mb-3">{request ? "History" : ""}</h4>
            <div className="form-section req-info-container mb-5">
                <div>Assigned by: <span>{request && request.assignedBy}</span> </div>
                <div>Assigned to: <span>{request && request.assignedTo}</span> </div> <br/>
                {request && <Timeline historydata={JSON.stringify(request.history)}></Timeline>}
            </div>

            <hr/>

            <div className="form-section btn-container">
                <Link className="mx-3" to="/">Go Back</Link>
                <input onClick={editRequest} type="button" value="Submit"/>
            </div>

        </div>
    ); 
}

export default editRequest; 