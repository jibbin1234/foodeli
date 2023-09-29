import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert('Enter valid credentials')
    }
    else{
      localStorage.setItem('authToken',json.authToken);
      navigate("/");
    }
  }
  const onChange = async (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-primary'>I'm a new user</Link>
        </form>
      </div>
    </>
  )
}
