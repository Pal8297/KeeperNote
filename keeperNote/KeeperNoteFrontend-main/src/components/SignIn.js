import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import { useNavigate } from "react-router";
import "./AddNote.css"
import "./Home.js"
const SignIn = () => {
  const link = "http://localhost:3000"
  const context = useContext(noteContext);
  const { showAlert } = context;
  const [credentials, setCredentials] = useState({name: '',email: '', password: ''});
  let navigation = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${link}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password}),
    });
    const json = await response.json();
    // console.log(json);
    if(json.sucess){
      localStorage.setItem('token', json.authtoken)
      navigation("/");
      showAlert("Account Created SucessFully.", "#B5F1CC","#17594A") 
    }else{
      showAlert("User Already Exist.", "#FF8989","#630000") 
    }
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <>
      <div className='outer-container signin-container'>
        <div className='container'>
          <p className="header" style={{display: "flex", justifyContent: "center"}}>Sign In</p>
          <div className='form-outerCOntainer'>
            <form className='form-container form-1-container' onSubmit={handleSubmit}>
            <div className="form-innerContainer">
                <label htmlFor='email'>Name</label>
                <br></br>
                <input type="text" id="name" name="name" minLength={5} required value={credentials.name} onChange={onChange}></input>
              </div>
              <div className="form-innerContainer">
                <label htmlFor='email'>Email</label>
                <br></br>
                <input type="email" id="email" name="email"  required value={credentials.email} onChange={onChange}></input>
              </div>
              <div className="form-innerContainer">
                <label htmlFor='password'>Password</label>
                <br></br>
                <input type="password" id="password" name="password" minLength={8} required value={credentials.password} onChange={onChange}></input>
              </div>
              <div className="submit-btn" >
                <button type="submit" >Signin</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn