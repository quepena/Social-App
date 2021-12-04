import express from 'express'
const router = express.Router();
import { createPost, timeline } from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(createPost)

router.route('/:userId').get(timeline)

export default router;