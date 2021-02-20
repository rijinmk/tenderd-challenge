import React, { useEffect, useState } from 'react';

import IconCard from './Components/IconCard/IconCard'; 

const addRequests = () => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working
    const [companyList, setCompanyList] = useState([]);
    const [usersInTheCompany, setusersInTheCompany] = useState(); 
    
    useEffect( async () => {
        fetch(`${baseAPI_URL}/api/company/all`)
            .then((data) => {
                return data.json(); 
            }) 
            .then((data) => {
                let companiesIconCardList = [];  
                data.forEach(element => {
                    companiesIconCardList.push(<IconCard companyid={element.id} key={element.id} groupName="company" title={element.company.name} type="big" icon="building" />); 
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
                    selectedUsersIconCards.push(<IconCard groupName="assigned-to-user" title={user.name} type="small" icon="user"></IconCard>); 
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
                <IconCard groupName="type-of-request" title="Breakdown" type="big" icon="unlink"></IconCard>
                <IconCard groupName="type-of-request" title="Maintenance" type="big" icon="truck-loading"></IconCard>
                <IconCard groupName="type-of-request" title="Replacement" type="big" icon="truck"></IconCard>
                <IconCard groupName="type-of-request" title="Demobilisation" type="big" icon="not-equal"></IconCard>
            </div>

            <h4 className="mt-5 mb-3">Description</h4>
            <div className="form-section desc-container">
                <textarea></textarea>
            </div>

            <h4 className="mt-5 mb-3">Status</h4>
            <div className="form-section icon-container">
                <IconCard groupName="status-of-request" title="Created" type="small" icon="plus-circle"></IconCard>
                <IconCard groupName="status-of-request" title="In Progress" type="small" icon="spinner"></IconCard>
                <IconCard groupName="status-of-request" title="Completed" type="small" icon="check"></IconCard>
                <IconCard groupName="status-of-request" title="Cancelled" type="small" icon="times"></IconCard>
            </div>

            <h4 className="mt-5 mb-3">Company</h4>
            <div className="form-section icon-container">
                {companyList && companyList}
            </div>

            <h4 className="mt-5 mb-3">Users</h4>
            <div className="form-section icon-container">
                {usersInTheCompany && usersInTheCompany}
            </div>

        </div>
    ); 
}

export default addRequests; 