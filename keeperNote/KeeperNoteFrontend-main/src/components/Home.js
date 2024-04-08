import React from 'react'
import AddNote from "./AddNote"
import "./Home.css"
import Notes from "./Notes"
const Home = () => {
    return (
        <div className='outer-container'>
            <div className='container'>
                <AddNote/>
                <Notes />
                
            </div>
        </div>
    )
}

export default Home