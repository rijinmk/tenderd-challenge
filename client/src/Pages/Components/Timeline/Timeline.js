import React, { useEffect, useState } from 'react';
const moment = require("moment");
// moment().fromNow()

const timeline = (props) => {
    
    let [history, setHistory] = useState(); 

    useEffect(() => {
        let historyArray = JSON.parse(props.historydata); 
        let pTagArray = []; 
        historyArray.forEach(e => {
            pTagArray.push(
                (
                    <p key={Math.floor(Math.random() * 10000)}>
                        <span className="moments">{moment(e.time).fromNow()}</span>  
                        <span className="status">{e.status}</span> 
                    </p>
                )
            ); 
        });
        setHistory(pTagArray); 
    }, []);

    return (
        <div className="timeline">
            {history}
        </div>
    ); 
}

export default timeline; 