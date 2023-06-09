import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';


const Register = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      
      const response = await axios.post(`/pre-register`, {email, password})
      console.log('response',response)
      if(response?.data?.error){
        toast.error(response.data.error)
        
      } else {
        toast.success('Please check your Email to verify your Email address')
        
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
      
    }
  }
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Register</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your email"
                className="form-control mb-4"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control mb-4"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                disabled={loading}
                className="btn btn-primary col-12 mb-4"
              >
                {loading ? "Waiting..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
