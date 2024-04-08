import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import { useNavigate } from "react-router";
const Login = () => {
  const context = useContext(noteContext);
  const { showAlert } = context;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigation = useNavigate();
  const link = "http://localhost:3000"
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${link}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.sucess) {
      localStorage.setItem('token', json.authtoken)
      showAlert("LoggedIn  SucessFully", "#B5F1CC", "#17594A")
      navigation("/");
    } else {
      showAlert("Invalid credentials", "#FF8989", "#630000")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='outer-container'>
        <div className='container container-lg-si'>
          <p className="header" style={{display: "flex", justifyContent: "center"}}>Login</p>
          <div className='form-outerCOntainer'>
            <form className='form-container form-1-container' onSubmit={handleSubmit}>
              <div className="form-innerContainer">
                <label htmlFor='email'>Email</label>
                <br></br>
                <input type="email" id="email" name="email" minLength={5} required value={credentials.email} onChange={onChange}></input>
              </div>
              <div className="form-innerContainer">
                <label htmlFor='password'>Password</label>
                <br></br>
                <input type="password" id="password" name="password" minLength={5} required value={credentials.password} onChange={onChange}></input>
              </div>
              <div className="submit-btn" >
                <button type="submit" >Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login