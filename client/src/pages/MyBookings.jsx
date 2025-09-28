// client/src/pages/MyBookings.jsx
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
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 my-16 max-w-7xl mx-auto">
      <Title
        title="My Bookings"
        subtitle="View and manage your all car bookings."
        align="left"
      />

      <div className="mt-12 space-y-6">
        {bookings.map((booking, index) => (
          <div
            key={booking._id}
            className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-lg"
          >
            {/* Left Side: Image and Car Details */}
            <div className="flex-shrink-0">
              <img
                src={booking.car.image}
                alt={`${booking.car.brand} ${booking.car.model}`}
                className="w-full md:w-48 h-auto md:h-32 rounded-md object-cover"
              />
              <div className="mt-4">
                <h3 className="text-lg font-medium">
                  {booking.car.brand} {booking.car.model}
                </h3>
                <p className="text-sm text-gray-500">
                  {booking.car.year} • {booking.car.category} • {booking.car.location}
                </p>
              </div>
            </div>

            {/* Right Side: Booking Information */}
            <div className="flex-grow flex flex-col md:flex-row justify-between w-full">
              {/* Middle Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="px-3 py-1.5 bg-light rounded text-gray-600">
                      Booking #{index + 1}
                    </p>
                    <p
                      className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {booking.status}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={assets.calendar_icon_colored}
                      alt=""
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p className="text-gray-500 text-sm">Rental Period</p>
                      <p className="text-sm font-medium">
                        {new Date(booking.pickupDate).toLocaleDateString()} to{" "}
                        {new Date(booking.returnDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <img
                      src={assets.location_icon_colored}
                      alt=""
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p className="text-gray-500 text-sm">Pick-up Location</p>
                      <p className="text-sm font-medium">{booking.car.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Far Right Section */}
              <div className="text-left md:text-right mt-6 md:mt-0">
                <p className="text-gray-500 text-sm mb-2">Total Price</p>
                <h1 className="text-2xl font-semibold text-primary mb-2">
                  {currency}
                  {booking.price.toLocaleString()}
                </h1>
                <p className="text-gray-500 text-sm">
                  Booked on {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;