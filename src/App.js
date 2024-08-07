import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Forgot from './Components/Forgot';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
        <Route path="/forgot" element={<Forgot/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
