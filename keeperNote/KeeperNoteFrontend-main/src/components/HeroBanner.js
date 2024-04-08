import React from 'react'
import { Link } from 'react-router-dom'
import "./HeroBanner.css"

const HeroBanner = () => {
  return (
    <>
      <div className='HeroBanner'>

        <p>Save your </p>
        <p>thoughts,</p>
        <p style={{marginBottom: "45px"}}> wherever you are</p>
        <Link to="/signin"><button>Try Keeper</button></Link>
      </div>
        
        
    </>
  )
}

export default HeroBanner