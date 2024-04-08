import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css"
const Navbar = () => {

    const context = useContext(noteContext);
    const { openNavModal, setOpenNavModal, navMenu, setNavMenu} = context;
    let location = useLocation();
    let navigation = useNavigate();

    const handleClick = () => {
        setNavMenu(!navMenu); 
        setOpenNavModal(!openNavModal)
    } 
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigation("/keeper")
    }
    return (
        <div className='nav' >
            <ul className='nav1'>
                <p className='header'>Keeper</p>
            </ul>
            {navMenu ? <i className="fa-sharp fa-solid fa-xmark hamburger" onClick={handleClick}></i> : <i className="fa-sharp fa-solid fa-bars hamburger" onClick={handleClick}></i>}
            <ul className='nav2' >
                
                <li >
                    <Link className={`${location.pathname === "/" ? "active" : ""}`} to="/" onClick={handleClick}>Home</Link>
                </li>
                <li>
                    <Link className={`${location.pathname === "/about" ? "active" : ""}`} to="/about" onClick={handleClick}>About Us</Link>
                </li>
                {!localStorage.getItem('token')
                ? <ul style={{display: 'flex', flexDirection: 'row', paddingLeft: 0}}><li>
                    <Link  to="/signin"><button>Sign up</button></Link>
                </li>
                <li>
                    <Link to="/login"><button>Login</button></Link>
                </li></ul> : <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>}
            </ul>
        </div>
    )
}

export default Navbar
