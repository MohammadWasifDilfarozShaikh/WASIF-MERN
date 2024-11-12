import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import Navbar from "../components/Navbar";

const Signup = () => {

    const [credentials , setcredentials ] = useState({name:"",email:"",password:"",geolocation:""})
    let navigate = useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/creatuser",{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({name:credentials.name, password:credentials.password, email:credentials.email,  location:credentials.geolocation})
        })

        const json = await response.json()
        
        
        if (json.success) {
          //save the auth toke to local storage and redirect
          localStorage.setItem('token', json.authToken)
          navigate("/login")
    
        }
        else {
          alert("Enter Valid Credentials")
        }
      

    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>
    <div className="container">
      <form onSubmit={handleSubmit}>

        <div className="mb-3 mt-5">
          <label htmlFor="name" className="form-label text-white">
            Name
          </label>
          <input
          placeholder="Enter your name"
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label text-white">
            Email address
          </label>
          <input
          placeholder="Enter your Email Address"
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
          placeholder="Enter your Password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label text-white">
            Address
          </label>
          <input
          placeholder="Enter your Address"
            type="text"
            className="form-control"
            id="exampleInputPassword"
            name="geolocation"
            value={credentials.geolocation}
            onChange={onChange}
          />
        </div>

       
        
        <button type="submit" className="m-1 btn btn-success">Submit</button>
           
        <Link to="/login" className="m-2 btn btn-danger">Already A User</Link>
      </form>
      </div>
      </div>
    </>
  );
};

export default Signup;

