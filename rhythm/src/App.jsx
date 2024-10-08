import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Routes,Route } from 'react-router-dom'

import GuitarTunner from './pages/GuitarTunner';
import HomePage from './pages/HomePage'
import OverviewPages from './pages/OverviewPages';


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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="tunner" element={<GuitarTunner/>}></Route>
        <Route path ="overview" element={<OverviewPages/>}></Route>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
