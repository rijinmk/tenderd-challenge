import React, { useEffect, useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free-solid'

const moment = require("moment"); 

const requestTable = (props) => {

    const baseAPI_URL = "http://localhost:5000"; // Added this cause proxy on package.json is not working
    const [companyRequests, setCompanyRequests] = useState(); 

    useEffect(async () => {
        let companyRequests = await fetch(`${baseAPI_URL}/api/request/company/${props.company}`); 
        companyRequests = await companyRequests.json(); 
        
        let companyRequestsTableRows = []; 
        console.log("REQQQU", companyRequests)
        companyRequests.company.forEach(data => {
            console.log("--->", data); 
            companyRequestsTableRows.push((
                <tr className={data.status} data-request-id key={Math.floor(Math.random() * 999999999)}>
                    <td>{data.type}</td>
                    <td>{data.assignedBy}</td>
                    <td>{data.status}</td>
                    <td>{moment(data.history[data.history.length-1].time).fromNow()}</td>
                    <td>{data.status}</td>
                    <td><FontAwesomeIcon icon="history" /></td>
                    <td><FontAwesomeIcon icon="pencil-alt" /></td>
                </tr>
            ));
        }); 
        
        setCompanyRequests(companyRequestsTableRows); 
    }, []); 

    return(
        <div className="component-request-table">
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Assigned By</th>
                        <th>Status</th>
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