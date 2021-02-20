import React, { useEffect, useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import IconCard from './Components/IconCard/IconCard'; 

const addRequests = () => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working
    const [companyList, setCompanyList] = useState([]);
    const { currentUser, logout } = useAuth(); 
    const [usersInTheCompany, setusersInTheCompany] = useState(); 

    const sendData = async () => {
        let type = document.querySelector("input[name='type-of-request']:checked").value;
        let status = document.querySelector("input[name='status-of-request']:checked").value;
        let assignedTo = document.querySelector("input[name='assigned-to-user']:checked").value;
        let company = document.querySelector("input[name='company']:checked").value;
        let description = document.querySelector(".desc-container textarea").value; 
        let assignedBy = currentUser.email;
        console.log("Sending request"); 
        await fetch(`${baseAPI_URL}/api/request/add?type=${type}&status=${status}&assignedTo=${assignedTo}&company=${company}&description=${description}&assignedBy=${assignedBy}`)
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

            <h4 className="mt-5 mb-3">Users</h4>
            <div className="form-section icon-container">
                {usersInTheCompany && usersInTheCompany}
            </div>

            <hr/>

            <div className="form-section icon-container">
                <input onClick={sendData} type="button" value="Submit"/>
            </div>

        </div>
    ); 
}

export default addRequests; 