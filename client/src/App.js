import React, { Component } from 'react';
import { app, auth } from './firebase/config'; 

// Main file thats created by gulp after compiling everything
import './bundle.min.css'

// User-Defined Components / Contexts
import AuthProvider from './firebase/AuthContext'; 

// Pages
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <AuthProvider>
          <SignIn></SignIn>
          <SignUp></SignUp>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
