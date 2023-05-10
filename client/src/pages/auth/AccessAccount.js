import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/auth'



const ActivateAccount = () => {
const {token} = useParams()
console.log('token',token)
const navigate = useNavigate()
const [auth, setAuth] = useAuth();

const activateAccount = async () => {
    try {
        const response = await axios.post('/access-account', {resetCode:token})
        console.log('response',response)
        if(response?.data?.error){
            toast.error('Token expired Register again')
        } else {
            toast.success('Welcome to real estate app')
            setAuth(response.data)
            localStorage.setItem('auth',JSON.stringify(response.data))
            navigate('/')
        }
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    if(token){
        activateAccount()
    }
},[token])
console.log('token',token)
  return (
    <div
    className="display-1 d-flex justify-content-center align-items-center vh-100"
    style={{ marginTop: "-5%" }}
  >
    Please wait...
  </div>
  )
}

export default ActivateAccount
