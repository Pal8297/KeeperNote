import React from 'react'
import "./Alert.css"
const Alert = ({alert}) => {
  return (
    <div className='alert' style={{backgroundColor: alert.color, color: alert.textColor, display: 'initial'}}>
        <p>{alert.msg}</p>
    </div>
  )
}

export default Alert