import express from 'express';
import {
    commentOnPost,
    createPost,
    deletePost,
    getFeedItems,
    likePost,
    updatePost
} from '../controllers/feed.controller.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateUser);

router.get('/', getFeedItems);
router.post('/post', createPost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);
router.post('/post/:id/like', likePost);
router.post('/post/:id/comment', commentOnPost);

export default router;
