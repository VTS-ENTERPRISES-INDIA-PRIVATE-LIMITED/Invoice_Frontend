import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Forgot from './Components/Forgot';
import Formm from './Components/Formm'
import './App.css';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import EditClientForm from './Components/EditClientForm';
// import colorsdata from './assets'
function App() {
  return (
  
    <BrowserRouter>
    {/* <h1 className='colorcolorwhatcolor'>Hello World</h1> */}
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/new" element={<Formm/>} />
      <Route path="/forgot" element={<Forgot/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/editClient" element={<EditClientForm/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
