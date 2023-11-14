import React, { useEffect, useState } from "react";

export default function About() {
  const host ="http://localhost:5000"
  const [user, setuser] = useState({name:"",email:"",date:""});
  const getuser = async()=>{
    // api call
    const response = await fetch(`${host}/api/user/getuser`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token')
      },
      
    });
    const json =await response.json();
    console.log(json);
   
    
  setuser(json)
  }
useEffect(() => {
getuser();


},[]);


 
  return (
    <div className="center
    my-8">
        
      {
      <div class="card" style={{width: "18rem"}}>
      <i class="fa-solid fa-user"></i>
        <div class="card-body">
          <h5 class="card-title">{user[1]}</h5>
          <p class="card-text">{user[2]}</p>
          <p class="card-text">{user[2]}</p>
        </div>
        <button className="btn btn-primary" >User</button>
  
</div>
    }
   
  
    </div>
  );
  }
