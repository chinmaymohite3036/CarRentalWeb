// client/src/components/Hero.jsx
import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    ); // Correct
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col justify-center items-center text-center gap-14 px-4 bg-light min-h-screen"
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl font-semibold mt-[-5rem]"
      >
        Luxury Cars on Rent
      </motion.h1>

      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 rounded-lg md:rounded-full w-full max-w-4xl bg-white shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 w-full md:pl-4">
          {/* Pickup Location */}
          <div className="flex flex-col items-start gap-1 w-full md:w-auto">
            <label className="font-medium text-gray-700 text-sm">
              Pickup Location
            </label>
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full bg-transparent text-gray-500 outline-none cursor-pointer"
            >
              <option value="">Please Select Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Pick-up Date */}
          <div className="flex flex-col items-start gap-1 w-full md:w-auto">
            <label
              htmlFor="pickup-date"
              className="font-medium text-gray-700 text-sm"
            >
              Pick-up Date
            </label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-transparent text-gray-500 outline-none"
              required
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col items-start gap-1 w-full md:w-auto">
            <label
              htmlFor="return-date"
              className="font-medium text-gray-700 text-sm"
            >
              Return Date
            </label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-transparent text-gray-500 outline-none"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-6 py-3 mt-4 md:mt-0 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer w-full md:w-auto transition-colors"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="w-5 h-5 invert brightness-0"
          />
          <span className="font-medium">Search</span>
        </motion.button>
      </motion.form>

      <motion.img
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_car}
        alt="car"
        className="max-h-72 w-auto"
      />
    </motion.div>
  );
};

export default Hero;
