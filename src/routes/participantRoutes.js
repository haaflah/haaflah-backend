import express from 'express';
import {
  registerParticipant,
  getEventParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
  checkInParticipant,
  bulkCheckIn,
} from '../controllers/participantController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/events/:eventId/register', registerParticipant);

// Protected routes (require authentication)
router.get('/events/:eventId', authMiddleware, getEventParticipants);
router.get('/:id', authMiddleware, getParticipantById);
router.put('/:id', authMiddleware, updateParticipant);
router.delete('/:id', authMiddleware, deleteParticipant);
router.post('/:id/check-in', authMiddleware, checkInParticipant);
router.post('/bulk-check-in', authMiddleware, bulkCheckIn);

export default router;
