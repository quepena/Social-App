import express from 'express'
const router = express.Router();
import { getCountries, createCountry } from '../controllers/countryController.js';

router.route('/').get(getCountries).post(createCountry);

export default router;