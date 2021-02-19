import React, { Component } from 'react';
import { app, auth } from './firebase/config'; 

// Main file thats created by gulp after compiling everything
import './bundle.min.css'

// Initially imported to test gulp tasks
import Button from './Components/Button/Button'
import InputType from './Components/InputType/InputType'
class App extends Component {
  render() {
    return (
      <div className="App container">

      </div>
    );
  }
}

export default App;
