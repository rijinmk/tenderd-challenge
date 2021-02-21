import React, { useEffect, useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free-solid'
import { Link, useHistory } from 'react-router-dom'; 

const moment = require("moment"); 

const requestTable = (props) => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working
    const [companyRequests, setCompanyRequests] = useState(); 

    function assignSetCompanyRequests(arr){
        setCompanyRequests(arr);
    }

    useEffect(async () => {
        let companyRequestsIDs = await fetch(`${baseAPI_URL}/api/request/company/${props.company}`); 
        companyRequestsIDs = await companyRequestsIDs.json(); 
        let companyRequestsTableRows = []; 
        companyRequestsIDs.company.forEach(async (e, i) => {
            let req = await fetch(`${baseAPI_URL}/api/request/${e}`);
            let data = await req.json();  
            companyRequestsTableRows.push((
                <tr className={data.status} data-request-id key={Math.floor(Math.random() * 999999999)}>
                    <td>{data.type}</td>
                    <td>{data.assignedBy}</td>
                    <td>{moment(data.history[data.history.length-1].time).fromNow()}</td>
                    <td>{data.history[data.history.length-1].status}</td>
                    <td> <FontAwesomeIcon icon="history" /></td>
                    <td><Link to={`/edit-request?${data.requestID}`}><FontAwesomeIcon icon="pencil-alt" /></Link></td>
                </tr>
            ));
            if(i===companyRequestsIDs.company.length-1){
                assignSetCompanyRequests(companyRequestsTableRows); 
            }
        });  
    }, []); 

    return(
        <div className="component-request-table">
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Assigned By</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                        <th>History</th>
                        <th>Edit</th>
                    </tr>
                </thead>

                <tbody>
                    {companyRequests && companyRequests}
                </tbody>
            </table>
        </div>
    ); 
}

export default requestTable; 