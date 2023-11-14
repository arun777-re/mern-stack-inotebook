import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Signup() {
    const history = useNavigate()
    const [user, setuser] = useState({name:"",email:"",password:"",cpassword:""})
    const handleonsubmit =async(e)=>{
      e.preventDefault()
     const response=await fetch(`http://localhost:5000/api/user/createuser`,{
       method:"POST",
       headers:{
        "Content-Type":"application/json"
       },
       body:JSON.stringify({name:user.name,email:user.email,password:user.password,cpassword:user.cpassword})
     });
     const data = await response.json();
     console.log(data)
     if(data.success){
      localStorage.setItem('token',data.authtoken);
      history('/')

     }
    }
    const handleonchange = (e)=>{
     e.preventDefault();
     setuser({...user,[e.target.name]:e.target.value});

    }
  return (
    <div className="container my-5">
      <h1 className="text-center">Create your account</h1>
    <form onSubmit={handleonsubmit}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          onChange={handleonchange}
          id="name"
          name='name'
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          onChange={handleonchange}
          id="email"
          name='email'
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name='password'
          value={user.password}
          onChange={handleonchange}
          id="password"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          name='cpassword'
          value={user.cpassword}
          onChange={handleonchange}
          id="cpassword"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Signup
      </button>
    </form>
  </div>
  )
}
