// routes/notification.routes.js
import express from 'express';
import {
  createNotification,
  deleteNotification,
  getNotifications,
  markAsRead
} from '../controllers/NotificationController.js';
import  authenticateUser  from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all notifications for the logged-in user
router.get('/', authenticateUser, getNotifications);

// Mark a specific notification as read
router.put('/:id', authenticateUser, markAsRead);

// Delete a specific notification
router.delete('/:id', authenticateUser, deleteNotification);

// Create a new notification (admin/system only)
router.post('/', authenticateUser, createNotification);

export default router;
