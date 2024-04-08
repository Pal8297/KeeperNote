import React, { useContext } from 'react'
import noteContext from "../src/context/notes/noteContext"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import NavModal from './components/NavModal';
import SignIn from './components/SignIn';
import Login from './components/Login';
import HeroBanner from './components/HeroBanner';
function App() {
  const context = useContext(noteContext);
    const {openNavModal, alert} = context;
    const Host = process.env.REACT_APP_HOST
  return (
    <>
      
        <Router>
        {openNavModal && <NavModal />}
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/keeper" element={<HeroBanner/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signin" element={<SignIn Host={Host}/>} />
            <Route exact path="/login" element={<Login Host={Host}/>} />
          </Routes>
        </Router>
    </>

  );
}

export default App;
