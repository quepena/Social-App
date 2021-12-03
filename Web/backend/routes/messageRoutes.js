import express from 'express'
const router = express.Router();
import { getMessages, createMessage, getMessageByConversation } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createMessage);
router.route('/:conversation').get(protect, getMessageByConversation);

export default router;