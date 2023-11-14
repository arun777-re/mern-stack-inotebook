import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000";
export default function Login(props) {
  const {showalert} = props;
  const [user, setuser] = useState({ email: "", password: "" });
  const history = useNavigate();
  const handleonchange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const handleonsubmit = async (e) => {
    e.preventDefault();
    // Api call
    const response = await fetch(`${host}/api/user/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:user.email,password:user.password}),
    });
    const json = await response.json();
    console.log(json);

    if(json.success===true){
        // save the auth-token
    localStorage.setItem('token',json.authtoken);
    showalert("Logged in Successfully","success");

        // redirect
        history('/');
    }else{
        showalert("Please enter valid email and password","False");
     }
    }
    
  return (
    <div className="container my-5">
      <h2 className="text-center">Login to continue with iNotebook</h2>
      <form onSubmit={handleonsubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={handleonchange}
            name="email"
            id="email"
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
            name="password"
            onChange={handleonchange}
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
