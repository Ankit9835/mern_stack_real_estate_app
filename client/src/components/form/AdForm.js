import React from 'react'
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import CurrencyInput from "react-currency-input-field";

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
        type: "",
        title: "",
        description: "",
        loading: false,
      });
      return (
        <>
          <div className="mb-3 form-control">
            <GooglePlacesAutocomplete
              apiKey=''
              apiOptions="au"
              selectProps={{
                defaultInputValue: ad?.address,
                placeholder: "Search for address..",
                onChange: ({ value }) => {
                  setAd({ ...ad, address: value.description });
                },
              }}
            />

    <CurrencyInput
        placeholder="Enter price"
        defaultValue={ad.price}
        className="form-control mb-3"
        onValueChange={(value) => setAd({ ...ad, price: value })}
      />
          </div>
    <br />
          <pre>{JSON.stringify(ad, null, 4)}</pre>
        </>
      );
    }


export default AdForm
