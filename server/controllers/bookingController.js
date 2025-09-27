import Booking from "../models/Booking.js"


// Function to check availability of car for a given date
const checkAvailability = async (car, pickupDate, returnDate)=>{
    const bookings = await Booking.find({
        car,
        pickupDate: {$lte: returnDate},
        returnDate: {$gte: pickupDate},
    })
    return bookings.length === 0;
}

// API to check availability of cars for the given date and location
export const checkAvailabilityOfCar = async (requestAnimationFrame, res)=>{
    try {
        const {location, pickupDate, returnDate} = requestAnimationFrame.body

        // fetch all available car for given location
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}