import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
const fetch = require("node-fetch");


const fetchApp = (url) => {
  return fetch(url).then(response => {
    if(response.ok) {
      return response.json()
    } else {
      return "Error"
    }
  }, failResponse => {
    return "Failed"
  })
}

function App() {
  const [res, setRes] = useState()
   fetchApp('http://127.0.0.1:8000/data').then(response => {
     setRes(response)
   })
    return (
        <div className="App">
          <header className="App-header">
            <p>{res && res.data}</p>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
}

export default App;
