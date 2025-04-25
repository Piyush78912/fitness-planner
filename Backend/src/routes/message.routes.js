import express from 'express';
import {
  getAllMessages,
  getUnreadMessagesCount,
  getMessageById,
  sendMessage,
  markMessageAsRead,
  deleteMessage
} from '../controllers/message.controller.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateUser);

router.get('/', getAllMessages);
router.get('/unread', getUnreadMessagesCount);
router.get('/:id', getMessageById);
router.post('/', sendMessage);
router.put('/:id/read', markMessageAsRead);
router.delete('/:id', deleteMessage);

export default router;
