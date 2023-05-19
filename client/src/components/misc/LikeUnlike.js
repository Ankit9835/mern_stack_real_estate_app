import React from 'react'
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const LikeUnlike = ({ad}) => {
    const navigate = useNavigate()
    const [auth,setAuth] = useAuth() 
   // console.log('wishlist',auth?.user?.wishlist)
    const likeAds = async () => {
        try {
            if(auth?.user == null){
                navigate('/login', {
                    state:`/single/ad/${ad.slug}`
                })
                return
            }
            const response = await axios.post('/add-to-wishlist', {adId:ad._id}, {
                headers:{
                    Authorization: auth.newToken
                }
            })
            console.log('response',response)
            if(response?.data){
                setAuth({...auth, user:response?.data})
                const localData = JSON.parse(localStorage.getItem('auth'))
                localData.user = response?.data
                localStorage.setItem('auth', JSON.stringify(localData))
                toast.success('wishlist added successfully')
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    const unlikeAds = async () => {
        try {
            const response = await axios.post(`/remove-from-wishlist/${ad._id}`, {
                headers:{
                    Authorization: auth.newToken
                }
            })
            console.log('response',response)
            if(response?.data){
                setAuth({...auth, user:response?.data})
                const localData = JSON.parse(localStorage.getItem('auth'))
                localData.user = response?.data
                localStorage.setItem('auth', JSON.stringify(localData))
                toast.success('wishlist removed successfully')
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }
  return (
    <>
        {auth?.user?.wishlist.includes(ad._id) ? <FcLike onClick={unlikeAds} /> : <FcLikePlaceholder onClick={likeAds}  /> }
    </>
  )
}

export default LikeUnlike
