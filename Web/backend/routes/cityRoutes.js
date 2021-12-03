import express from 'express'
const router = express.Router();
import { getCities, createCities } from '../controllers/cityController.js';

router.route('/:countryId').get(getCities).post(createCities);

export default router;