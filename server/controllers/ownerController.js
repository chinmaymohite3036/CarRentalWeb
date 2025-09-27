import { format } from "path";
import imagekit from "../configs/imageKit.js";
import User from "../models/User.js";
import fs from "fs";
import Car from "../models/Car.js";

// API to change role of user
export const changeRoleToOwner = async (req, res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "Now you are an owner"})
    } catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to list car

export const addCar = async (req, res)=>{
    try{
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        // Upload image to imageKit
        const fileBuffer =fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        // optimization through imagekit URL transformation
        var optimizedImageUrl = imagekit.url({
            path: response.filepath,
            transformation: [
                {width: '1280'},  // width resizing
                {quality: 'auto'},  // auto compression
                {format : 'webp'}  // convert to modern format
            ]
        });

        const image = optimizedImageUrl;
        await Car.create({...car, owner: _id, image})

        res.json({success: true, message: "Car added successfully"})

    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}