import './App.css';

import React, { Component } from 'react';

import Messages from './Components/Messages';
import logo from './logo.svg';

class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Messages/>
      </div>
    );
  }
}

export default App;
