import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";
import axios from 'axios';
import LikeUnlike from '../misc/LikeUnlike';


const SingleCard = () => {
    const params = useParams()
    const [ad,setAd] = useState({})
    const {slug} = params
    console.log(slug)
    const singleAd = async () => {
        try {
            const response  = await axios.get(`/single-ads/${slug}`)
            console.log('response',response)
            setAd(response.data.ads)
        } catch (error) {
            console.log(error)            
        }
    }

    useEffect(() => {
        singleAd()
    },[])
    // function formatNumber(x) {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //   }
  return (
    <>
        <div className='container'>
        <div className="card hoverable shadow">
          <img
            src={ad?.photos?.[0]?.Location}
            alt={`${ad?.type}-${ad?.address}-${ad?.action}-${ad?.price}`}
            style={{ height: "250px", objectFit: "cover" }}
          />

          <div className="card-body">
            <h3>{ad?.price}</h3>
            <br />
            <p className="card-text">{ad?.address}</p>
            <LikeUnlike ad={ad} />
            <br />
            <p className="card-text d-flex justify-content-between">
                {ad?.bedrooms ? (
                  <span>
                    <IoBedOutline /> {ad?.bedrooms}
                  </span>
                ) : (
                  ""
                )}

                {slug?.bathrooms ? (
                  <span>
                    <TbBath /> {ad?.bathrooms}
                  </span>
                ) : (
                  ""
                )}

                {slug?.landsize ? (
                  <span>
                    <BiArea /> {ad?.landsize}
                  </span>
                ) : (
                  ""
                )}
              </p>

            {/* <AdFeatures ad={ad} /> */}
          </div>
        </div>
        </div>
        
    </>
  )
}

export default SingleCard
