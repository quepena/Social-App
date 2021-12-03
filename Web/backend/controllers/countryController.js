import Country from "../models/countryModel.js";
import asyncHandler from 'express-async-handler';

const getCountries = asyncHandler(async(req, res) => {
    const countries = await Country.find({})

    res.json(countries);
})

const createCountry = asyncHandler(async (req, res) => {
    const { countryName } = req.body;

    const newCountry = await Country.create({
        countryName
    })

    if (newCountry) {
        res.status(201).json(newCountry)
    } else {
        res.status(400).json({ message: "Invalid country data" });
    }
})

export { getCountries, createCountry };