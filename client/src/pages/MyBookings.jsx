import React, { useState } from "react";
import { dummyMyBookingsData } from "../assets/assets";

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const fetchMyBookings = async ()=>{
    setBookings(dummyMyBookingsData)
  }
  return (
    <div>

    </div>
  )
}

export default MyBookings
