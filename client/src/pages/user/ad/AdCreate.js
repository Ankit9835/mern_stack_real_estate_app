import React, { useState } from 'react'
import { useAuth } from "../../../context/auth";
import Sidebar from '../../../components/nav/Sidebar';
import { useNavigate } from 'react-router-dom';


const AdCreate = () => {
    const [auth, setAuth] = useAuth();
    const [sellHouse,setSellHouse] = useState(false)
    const [sellRent,setSellRent] = useState(false)
    const navigate = useNavigate()

    const handleSell = () => {
        setSellHouse(true)
        setSellRent(false)
    }

    const handleRent = () => {
        setSellRent(true)
        setSellHouse(false)
    }

  return (
    <div>
        <h1 className="display-1 bg-primary text-light p-5">Ad Create</h1>
        <Sidebar />
        <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ marginTop: "-9%" }}
      >
        <div className="col-lg-6">
          <button
            onClick={handleSell}
            className="btn btn-primary btn-lg col-12 p-5"
          >
            <span className="h2">Sell</span>
          </button>
          {sellHouse && (
            <div className="my-1">
              <button
                onClick={() => navigate("/ad/create/sell/House")}
                className="btn btn-secondary p-5 col-6"
              >
                House
              </button>
              <button
                onClick={() => navigate("/ad/create/sell/Land")}
                className="btn btn-secondary p-5 col-6"
              >
                Land
              </button>
            </div>
          )}
        </div>

        <div className="col-lg-6">
          <button
            onClick={handleRent}
            className="btn btn -primary btn-lg col-12 p-5"
          >
            <span className="h2">Rent</span>
          </button>
          {sellRent && (
            <div className="my-1">
              <button
                onClick={() => navigate("/ad/create/rent/House")}
                className="btn btn-secondary p-5 col-6"
              >
                House
              </button>
              <button
                onClick={() => navigate("/ad/create/rent/Land")}
                className="btn btn-secondary p-5 col-6"
              >
                Land
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdCreate
