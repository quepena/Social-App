import express from 'express'
import { getUsersForAdmin, deleteUserForAdmin, getUserByIdForAdmin, updateUserProfileForAdmin } from '../controllers/adminController.js';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/users').get(protect, admin, getUsersForAdmin);

router.route('/users/:id')
    .delete(protect, admin, deleteUserForAdmin)
    .get(protect, admin, getUserByIdForAdmin)
    .put(protect, admin, updateUserProfileForAdmin);

export default router;