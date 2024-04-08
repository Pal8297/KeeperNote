import React from 'react'
import "./AddNote.css"

const About = () => {
  return (
    <div className='about-outercontainer'>
    <div className='about'>
      <h2>About Our Note Application</h2>
      <p style={{fontSize: "1.2rem"}}>Welcome to our note-taking application! We're excited to provide you with a convenient and intuitive tool to capture and organize your thoughts, ideas, and important information.</p>

      <h2>Purpose</h2>
      <p style={{fontSize: "1.2rem"}}>Our note application is designed to help you stay organized, increase productivity, and streamline your digital note-taking experience. Whether you're a student, professional, or simply someone who loves jotting down thoughts, our application is here to assist you in keeping your notes structured and easily accessible.</p>
      
      <h2>Get Started</h2>
      <p style={{fontSize: "1.2rem"}}>Ready to get started with our note application? Simply sign in for an account, and you'll gain access to a world of note-taking possibilities. Begin capturing your ideas, organizing your thoughts, and taking your productivity to the next level.</p>
      <p style={{fontSize: "1.2rem"}}>If you have any questions or need assistance, our support team is always here to help. Feel free to reach out to us through our contact page, and we'll be delighted to assist you.</p>
      <p style={{fontSize: "1.2rem"}}>Thank you for choosing our note application. We hope you enjoy using it and find it valuable in your day-to-day life!</p>

      <h2>Security and Privacy</h2>

      <p style={{fontSize: "1.2rem"}}>We take the security and privacy of your notes seriously. Our application implements robust encryption protocols to protect your data and ensure that only authorized users can access it. Rest assured that your information is kept confidential and stored securely.</p>
    </div>
    </div>
  )
}

export default About