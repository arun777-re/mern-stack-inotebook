import React, { useEffect, useState } from 'react'

import { Link} from 'react-router-dom'

export default function Emailverify(props) {
  const {showalert} = props;
     const host = "http://localhost:5000"
    const [valid, setvalid] = useState(false)
    // const param = useParams()
    useEffect((props) => {
      const verifyEmail = async()=>{
        try {
          const response = await fetch(`${host}/api/user/getuser`,{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
              "auth-token":localStorage.getItem('token')
            },
            
          });
          const json =await response.json();
          console.log(json);
          showalert("Success","Email verified successfully")
         
        
        setvalid(true)
        //eslint-disable-next-line

        } catch (error) {
            console.log(error);
            setvalid(false);
            
        }
      }
      verifyEmail()
      
    },[])
    
  return (
    <>
   {valid?(
   <div className="container">
    <h1>Email verified successfully</h1>
      <Link className="navbar-brand" to="/login"></Link>
    </div>
   )
   :<h1>404 not found</h1>}
    </>
  )
}
