import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavModal.css"

const NavModel = () => {
    let location = useLocation();
    const context = useContext(noteContext);
    let navigation = useNavigate();
    const { openNavModal, setOpenNavModal, navMenu, setNavMenu } = context;
    const handleClick = () => {
        setNavMenu(!navMenu);
        setOpenNavModal(!openNavModal)
    }
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigation("/keeper")
    }
    return (

        <div className='modalBackground1'>
            <ul >
                <div className='modalContainer1'>
                    <li >
                        <Link className={`${location.pathname === "/" ? "active" : ""}`} to="/" onClick={handleClick}>Home</Link>
                    </li>
                    <li>
                        <Link className={`${location.pathname === "/about" ? "active" : ""}`} to="/about" onClick={handleClick}>About Us</Link>
                    </li>
                    {!localStorage.getItem('token')
                        ? <><li>
                            <Link to="/signin" onClick={handleClick}><button>Sign up</button></Link>
                        </li>
                            <li>
                                <Link to="/login" onClick={handleClick}><button>Login</button></Link>
                            </li></> : <li>
                            <button onClick={() => {
                                handleLogout();
                                handleClick()
                            }}>Logout</button>
                        </li>}
                </div>
            </ul>
        </div>
    )
}

export default NavModel
