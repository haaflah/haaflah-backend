import express from 'express';
import {
  getPlatformStats,
  getMyStats,
  getEventStats,
  getEventsByDateRange,
} from '../controllers/statsController.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = express.Router();


// Protected routes (require authentication)
router.get('/my', authMiddleware, getMyStats);
router.get('/events/:id', authMiddleware, getEventStats);
router.get('/date-range', authMiddleware, getEventsByDateRange);

// Admin only routes
router.get('/platform', authMiddleware, requireRole('admin'), getPlatformStats);

export default router;
