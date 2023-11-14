import React from 'react'

export default function Alert(props) {
  const {alert} = props;
  const capitalize = (word)=>{
    let lower = word.toLowerCase();
    const capital = lower.charAt(0).toUpperCase() + lower.slice(1);
    return capital;
  }
  return (
    <div style={{height:"50px"}}>

{  alert &&  <div className="alert alert-primary" role="alert">
    <strong>{capitalize(alert.type)}</strong>: {alert.message} 
</div>}
    </div>
  )
}
