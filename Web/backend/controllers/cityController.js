import City from "../models/cityModel.js";
import asyncHandler from 'express-async-handler';

const getCities = asyncHandler(async(req, res) => {
    const cities = await City.find({ countryId: req.params.countryId })

    res.json(cities);
})

const createCities = asyncHandler(async (req, res) => {
    const { cityName, countryId } = req.body;

    const newCity = await City.create({
        cityName,
        countryId
    })

    if (newCity) {
        res.status(201).json(newCity)
    } else {
        res.status(400).json({ message: "Invalid city data" });
    }
})

export { getCities, createCities };