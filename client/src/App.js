import React, { Component } from 'react';
import { app, auth } from './firebase/config'; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

// Main CSS file thats created by gulp after compiling everything
import './bundle.min.css'

// User-Defined Components / Contexts
import AuthProvider from './firebase/AuthContext';
import AuthenticatedRoute from './firebase/AuthenticatedRoute' 
import UnauthenticatedRoute from './firebase/UnauthenticatedRoute' 

// Pages
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile'; 
import AddRequests from './Pages/AddRequests'; 
import EditRequests from './Pages/EditRequests'; 

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Router>
          <AuthProvider>
            <Switch>
              <UnauthenticatedRoute path="/signup" component={SignUp}></UnauthenticatedRoute>
              <UnauthenticatedRoute path="/signin" component={SignIn}></UnauthenticatedRoute>
              <AuthenticatedRoute exact path="/" component={Profile}></AuthenticatedRoute>
              <AuthenticatedRoute path="/add-request" component={AddRequests}></AuthenticatedRoute>
              <AuthenticatedRoute path="/edit-request" component={EditRequests}></AuthenticatedRoute>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    );
  }
}

export default App;
