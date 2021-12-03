import express from 'express'
const router = express.Router();
import { createPost, updatePost, getPost, timeline, likePost, deletePost } from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(createPost)

router.route('/timeline/all').get(timeline)

router.route('/:id').get(getPost).put(updatePost).delete(deletePost)

router.route('/:id/like').put(likePost)

export default router;