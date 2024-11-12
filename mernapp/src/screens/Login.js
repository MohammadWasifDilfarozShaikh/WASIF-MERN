import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Login() {
  const [credentials , setcredentials ] = useState({email:"",password:""})
  let navigate = useNavigate()

  const handleSubmit = async(e) =>{
      e.preventDefault();
     const response = await fetch("http://localhost:5000/api/loginuser",{
          method:'POST',
          headers:{
              'Content-Type' : 'application/json'
          },
          body:JSON.stringify({password:credentials.password, email:credentials.email})
      })

      const json = await response.json()

      if(!json.success){
          alert("Enter Valid Credientials ")
      }
      
      if(json.success){
        localStorage.setItem("userEmail",credentials.email)
        localStorage.setItem("authToken",json.authToken)
        navigate('/')
    }

  }
  const onChange=(event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
  }

  return (
    <>
      <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className="container">
      <form onSubmit={handleSubmit}>

        <div className="mb-3 mt-5">
          <label htmlFor="exampleInputEmail1" className="form-label text-white">
            Email address
          </label>
          <input
          placeholder='Enter Email Address'
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label text-white">
            Password
          </label>
          <input
          placeholder='Enter Password'
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="m-1 btn btn-success">
          Submit
        </button>
        <Link to="/creatuser" className="m-2 btn btn-danger">I'm a new user</Link>
      </form>
      </div>
      </div>
    </>
  )
}

export default Login
