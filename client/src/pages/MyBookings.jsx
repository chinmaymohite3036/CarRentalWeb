import React, { useEffect, useState } from "react";
import { assets, dummyMyBookingsData } from "../assets/assets";
import Title from "../components/Title";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY;
  const fetchMyBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
      <Title
        title="My Bookings"
        subtitle="View and manage your all car bookings."
        align="left"
      />

      <div>
        {bookings.map((booking, index) => (
          <div
            key={booking._id}
            className="relative p-6 border border-gray-200 rounded-lg mt-5 first:mt-12"
          >
            {/* Car Image */}
            <div className="w-48 h-32 rounded-md overflow-hidden mb-4">
              <img
                src={booking.car.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            {/* Car Info Below Image */}
            <div>
              <h3 className="text-lg font-medium mb-2">
                {booking.car.brand} {booking.car.model}
              </h3>
              <p className="text-sm text-gray-500">
                {booking.car.year} • {booking.car.category} •{" "}
                {booking.car.location}
              </p>
            </div>

            {/* Booking Info */}
            <div className="absolute top-6 left-60 flex items-center gap-2">
              <p className="px-3 py-1.5 bg-light rounded">
                Booking #{index + 1}
              </p>
              <p
                className={`px-3 py-1 text-xs rounded-full ${
                  booking.status === "confirmed"
                    ? "bg-green-400/15 text-green-600"
                    : "bg-red-400/15 text-red-600"
                }`}
              >
                {booking.status}
              </p>
            </div>

            {/* Rental Period - Right of Image */}
            <div className="absolute top-16 left-60 flex items-start gap-2">
              <img
                src={assets.calendar_icon_colored}
                alt=""
                className="w-4 h-4 mt-1"
              />
              <div>
                <p className="text-gray-500 text-sm">Rental Period</p>
                <p className="text-sm">
                  {booking.pickupDate.split("T")[0]} To{" "}
                  {booking.returnDate.split("T")[0]}
                </p>
              </div>
            </div>

            <div className="absolute top-30 left-60 flex items-start gap-2">
              <img
                src={assets.location_icon_colored}
                alt=""
                className="w-4 h-4 mt-1"
              />
              <div>
                <p className="text-gray-500 text-sm">Pick-up Location</p>
                <p className="text-sm">{booking.car.location}</p>
              </div>
            </div>

            {/* Price - Rightmost */}
            <div className="absolute top-6 right-6 text-right">
              <p className="text-gray-500 text-sm mb-2">Total Price</p>
              <h1 className="text-2xl font-semibold text-primary mb-2">
                {currency}
                {booking.price}
              </h1>
              <p className="text-gray-500 text-sm">
                Booked on {booking.createdAt.split("T")[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
