import React from 'react'
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import CurrencyInput from "react-currency-input-field";
import UploadPhoto from './UploadPhoto';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';


const AdForm = ({action,type}) => {
    const [ad, setAd] = useState({
        photos: [],
        uploading: false,
        price: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        carpark: "",
        landsize: "",
        type,
        action,
        title: "",
        description: "",
        loading: false,
      });
      const [auth,setAuth] = useAuth()
      console.log('auth',auth)
      const submitAd = async () => {
        try {
          setAd({...ad, loading: true})
          let token = localStorage.getItem('auth')
          console.log('token',token)
          const response = await axios.post('/post-ad', ad, {
            headers:{
              Authorization: auth.newToken
            }
          })
          setAd({...ad, loading: false})
          if(response.data.status){
            toast.success(response.data.message)
          } else {
            toast.error(response.data.message)
          }
          console.log('response',response)
        } catch (error) {
          console.log(error)
          setAd({...ad, loading: false})
        }
      }

      return (
        <>
          <div className="mb-3 form-control">
            <UploadPhoto ad={ad} setAd={setAd} />
                  {/* <GooglePlacesAutocomplete
                    apiKey=''
                    apiOptions="au"
                    selectProps={{
                      defaultInputValue: ad?.address,
                      placeholder: "Search for address..",
                      onChange: ({ value }) => {
                        setAd({ ...ad, address: value.description });
                      },
                    }}
                  /> */}

              <input
                type="text"
                 className="form-control mb-3"
                 placeholder="Enter address"
                 value={ad.address}
                 onChange={(e) => setAd({ ...ad, address: e.target.value })}
              />

              <CurrencyInput
                  placeholder="Enter price"
                  defaultValue={ad.price}
                  className="form-control mb-3"
                  onValueChange={(value) => setAd({ ...ad, price: value })}
                />

            {ad.type == 'House' && 
             <>
                      <input
                    type="number"
                    min="0"
                    className="form-control mb-3"
                    placeholder="Enter how many bedrooms"
                    value={ad.bedrooms}
                    onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
                  />

                  <input
                    type="number"
                    min="0"
                    className="form-control mb-3"
                    placeholder="Enter how many bathrooms"
                    value={ad.bathrooms}
                    onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
                  />

                <input
                  type="number"
                  min="0"
                  className="form-control mb-3"
                  placeholder="Enter how many carpark"
                  value={ad.carpark}
                  onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
                />
             </>
             
            }
              

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Size of land"
              value={ad.landsize}
              onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter title"
              value={ad.title}
              onChange={(e) => setAd({ ...ad, title: e.target.value })}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Enter description"
              value={ad.description}
              onChange={(e) => setAd({ ...ad, description: e.target.value })}
            />

            <button onClick={submitAd} className="btn btn-primary">
              {ad.loading ? 'Loading...' : 'Submit'}
            </button>
            
          </div>
        </>
      );
    }


export default AdForm
