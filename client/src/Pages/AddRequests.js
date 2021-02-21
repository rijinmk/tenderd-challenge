import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import IconCard from './Components/IconCard/IconCard'; 
import { Link, useHistory } from 'react-router-dom'; 

const addRequests = () => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working
    const [companyList, setCompanyList] = useState([]);
    const { currentUser, logout } = useAuth(); 
    const [usersInTheCompany, setusersInTheCompany] = useState(); 
    const history = useHistory(); 

    const sendData = async (e) => {

        e.target.style.opacity = 0.3; 
        e.target.style.cursor = "not-allowed"; 
        e.target.setAttribute('disabled', 'true'); 

        let type = document.querySelector("input[name='type-of-request']:checked");
        let status = document.querySelector("input[name='status-of-request']:checked");
        let assignedTo = document.querySelector("input[name='assigned-to-user']:checked");
        let company = document.querySelector("input[name='company']:checked");
        let description = document.querySelector(".desc-container textarea"); 
        let assignedBy = currentUser.email;
        console.log(type, status, assignedTo, company, description, assignedBy); 
        if(type && status && assignedTo && company && description && assignedBy){
            console.log("Sending request"); 
            await fetch(`${baseAPI_URL}/api/request/add?type=${type.value}&status=${status.value}&assignedTo=${assignedTo.value}&company=${company.value}&description=${description.value}&assignedBy=${assignedBy}`)
            alert("Request send"); 
            setTimeout(() => {
                history.push("/"); 
            }, 500); 
        }else{
            e.target.style.opacity = 1; 
            e.target.style.cursor = "pointer"; 
            e.target.removeAttribute('disabled'); 
            alert("Please fill in all the fields"); 
        }

    }
    
    useEffect( async () => {
        fetch(`${baseAPI_URL}/api/company/all`)
            .then((data) => {
                return data.json(); 
            }) 
            .then((data) => {
                let companiesIconCardList = [];  
                data.forEach(element => {
                    companiesIconCardList.push(<IconCard companyid={element.id} radioval={element.id} key={element.id} groupName="company" title={element.company.name} type="big" icon="building" />); 
                });
                setCompanyList(companiesIconCardList); 
            }); 

        let allUsers = await fetch(`${baseAPI_URL}/api/user/all`);
        let users = await allUsers.json();
        console.log(users); 

        document.querySelectorAll('.component-icon-card[data-companyid]').forEach(element => {
            console.log("element", element); 
            element.addEventListener('click', async (e) => {
                let selectedCompany = e.target.parentElement.dataset.companyid; 
                let allUsersReq = await fetch(`${baseAPI_URL}/api/user/all`);
                let allUsers = await allUsersReq.json();
                // console.log("All users of this company", allUsers);
                let usersOfSelectedCompany = [] 
                allUsers.forEach(user => {
                    if(user.company === selectedCompany){
                        usersOfSelectedCompany.push(user); 
                    }
                }); 
                console.log("Users in the company", usersOfSelectedCompany); 
                let selectedUsersIconCards = []; 
                usersOfSelectedCompany.forEach(user => {
                    selectedUsersIconCards.push(<IconCard key={user.email} radioval={user.email} groupName="assigned-to-user" title={user.name} type="small" icon="user"></IconCard>); 
                }); 
                setusersInTheCompany(selectedUsersIconCards);
            })
        }); 
    }, []); 

    

    return (
        <div>
            <h1>Add new request</h1>

            <h4 className="mt-5 mb-3">Type of Request</h4>
            <div className="form-section icon-container">
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

            <h4 className="mt-5 mb-3">Company</h4>
            <div className="form-section icon-container">
                {companyList && companyList}
            </div>

            <h4 className="mt-5 mb-3">{usersInTheCompany ? "Users" : ""}</h4>
            <div className="form-section icon-container mb-5">
                {usersInTheCompany && usersInTheCompany}
            </div>

            <hr/>

            <div className="form-section btn-container">
                <Link className="mx-3" to="/">Go Back</Link>
                <input onClick={sendData} type="button" value="Submit"/>
            </div>

        </div>
    ); 
}

export default addRequests; 