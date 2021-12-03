import express from 'express'
const router = express.Router();
import { getConversations, createConversation, getConversationByUser } from '../controllers/conversationController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getConversations).post(protect, createConversation);
router.route('/:userId').get(protect, getConversationByUser);

export default router;