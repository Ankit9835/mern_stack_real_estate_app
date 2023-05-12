import React from 'react'
import Sidebar from '../../../components/nav/Sidebar'
import AdForm from '../../../components/form/AdForm'

const RentHouse = () => {
  return (
    <div>
    <h1 className="display-1 bg-primary text-light p-5">Sell Land</h1>
    <Sidebar />
    <div className="container mt-2">
      <AdForm action="Rent" type="House" />
    </div>
  </div>
  )
}

export default RentHouse
