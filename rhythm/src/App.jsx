import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [text, setText] = useState(""); // State to hold the response text

  function getTest() {
    axios.get('http://localhost:5000/getRequest', { crossdomain: true })
      .then(response => {
        setText(response.data); // Update the state with the response data
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }

  return (
    <>
      <button onClick={getTest}>Test</button> {/* Simplified onClick syntax */}
      <div>{text}</div> {/* Display the response text */}
    </>
  );
}

export default App;
