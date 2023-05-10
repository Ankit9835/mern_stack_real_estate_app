import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';




const ForgotPassword = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [auth,setAuth] = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try { 
      const response = await axios.post(`/forgot-password`, {email})
      console.log('response',response)
      if(response?.data?.error){
        toast.error(response.data.error)
        
      } else {
          setAuth(response.data)
         // localStorage.setItem('auth', JSON.stringify(response.data))
          toast.success('Please check your Email for resetting the password')
          navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
      
    }
  }
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Forgot Password</h1>
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
              <button
                disabled={loading}
                className="btn btn-primary col-12 mb-4"
              >
                {loading ? "Waiting..." : "Submit"}
              </button>
            </form>
            <Link className='text-danger' to='/login'>Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
