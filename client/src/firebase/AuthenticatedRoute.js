import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 
import { useAuth } from './AuthContext'; 

const AuthenticatedRoute = ({component: Component, ...rest}) => {
    const { currentUser } = useAuth(); 
    return (
        <Route {...rest} render={props => { return currentUser ? <Component {...props} /> : <Redirect to="/signin" /> }}></Route>
    ); 
}

export default AuthenticatedRoute; 