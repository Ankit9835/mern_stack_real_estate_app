import React, { useEffect, useState } from 'react'
import { useAuth } from "../context/auth";
import axios from 'axios';
import AdCard from '../components/cards/AdCard';



const Home = () => {
    const [auth, setAuth] = useAuth();
    const [addForSell,setAddForSell] = useState([])
    const [addForRent,setAddForRent] = useState([])

    const getAllAds = async () => {
      try {
        const response = await axios.get('/all-ads')
        console.log('ad response',response)
        if(response?.data?.status){
          setAddForSell(response?.data?.sell)
          setAddForRent(response?.data?.rent)
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getAllAds()
    },[])

  return (
    <div>
      
       
    <h1 className="display-1 bg-primary text-light p-5">For Sell</h1>
        {addForSell.length > 0 ? 
         <>
      <div className="container">
        <div className="row">
          {addForSell?.map((ad) => (
            <AdCard ad={ad} key={ad._id} />
          ))}
        </div>
      </div>
        </>
        : 'No Property Found For Sell'
      } 
     
     
     
          <h1 className="display-1 bg-primary text-light p-5">For Rent</h1>
          {addForRent.length > 0 ? 
           <>
          <div className="container">
            <div className="row">
              {addForRent?.map((ad) => (
                <AdCard ad={ad} key={ad._id} />
              ))}
            </div>
          </div>
      </>
      : 
      <h2>
        No Property Found For Rent
      </h2>
      }
    </div>
  )
}

export default Home
