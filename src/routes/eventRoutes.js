import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getMyEvents,
} from '../controllers/eventController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);

// Protected routes (require authentication)
router.post('/', authMiddleware, createEvent);
router.get('/my/events', authMiddleware, getMyEvents);

// Generic routes (should come after specific ones)
router.get('/:id', getEventById);
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

export default router;
