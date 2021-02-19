import React, { useEffect } from 'react';
import { TimelineLite } from 'gsap'; 

const errorBox = (props) => {

    useEffect(() => {
        let tl = new TimelineLite(); 
        console.log(props.message.length); 
        let heightValue = (props.message.length > 38) ? "55px" : "35px";
        tl.to('.component-error-box', 0.4, {height: heightValue, width: "100%"})
          .to('.component-error-box span', 0.3, {top: "0px"}, 0.2)
    }, []); 

    return (
        <div className="component-error-box">
            <span>
                {props.message}
            </span>
        </div>
    ); 
}

export default errorBox;