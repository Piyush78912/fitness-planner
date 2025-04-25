import express from 'express';
import {
  getAllHandbookEntries,
  getHandbookEntryById,
  getHandbookEntriesByCategory,
  searchHandbook
} from '../controllers/handbook.controller.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateUser);

router.get('/', getAllHandbookEntries);
router.get('/:id', getHandbookEntryById);
router.get('/category/:category', getHandbookEntriesByCategory);
router.get('/search', searchHandbook);

export default router;
