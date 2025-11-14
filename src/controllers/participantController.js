import { Participant, Event, User } from '../models/index.js';
import { Op } from 'sequelize';

// Register a participant for an event (public)
export const registerParticipant = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const payload = {
      ...req.body,
      eventId,
    };

    const participant = await Participant.create(payload);
    res.status(201).json({ participant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to register participant' });
  }
};

// Get participants for an event (protected)
export const getEventParticipants = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Only organizer or admin can fetch full list
    if (req.user.role !== 'organizer' && event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const participants = await Participant.findAll({
      where: { eventId },
      order: [['createdAt', 'DESC']],
    });

    res.json({ participants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch participants' });
  }
};

// Get single participant by id (protected)
export const getParticipantById = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByPk(id);
    if (!participant) return res.status(404).json({ error: 'Participant not found' });

    const event = await Event.findByPk(participant.eventId);
    if (!event) return res.status(404).json({ error: 'Associated event not found' });

    // Organizer, admin allowed
    if (req.user.role !== 'organizer' && event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ participant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch participant' });
  }
};

// Update participant (protected)
export const updateParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByPk(id);
    if (!participant) return res.status(404).json({ error: 'Participant not found' });

    const event = await Event.findByPk(participant.eventId);
    if (!event) return res.status(404).json({ error: 'Associated event not found' });

    if (req.user.role !== 'organizer' && event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await participant.update(req.body);
    res.json({ participant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update participant' });
  }
};

// Delete participant (protected)
export const deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByPk(id);
    if (!participant) return res.status(404).json({ error: 'Participant not found' });

    const event = await Event.findByPk(participant.eventId);
    if (!event) return res.status(404).json({ error: 'Associated event not found' });

    if (req.user.role !== 'organizer' && event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await participant.destroy();
    res.json({ message: 'Participant removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete participant' });
  }
};

// Check-in a participant (protected)
export const checkInParticipant = async (req, res) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByPk(id);
    if (!participant) return res.status(404).json({ error: 'Participant not found' });

    const event = await Event.findByPk(participant.eventId);
    if (!event) return res.status(404).json({ error: 'Associated event not found' });

    if (req.user.role !== 'organizer' && event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await participant.update({ checkedIn: true, checkedInAt: new Date() });
    res.json({ participant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to check in participant' });
  }
};

// Bulk check-in (protected) - accepts { ids: [] } or { query: {...} }
export const bulkCheckIn = async (req, res) => {
  try {
    const { ids, query } = req.body;

    if (!Array.isArray(ids) && !query) {
      return res.status(400).json({ error: 'Provide ids array or a query object' });
    }

    let updated;
    if (Array.isArray(ids)) {
      // Fetch one participant to validate permissions
      const first = await Participant.findByPk(ids[0]);
      if (!first) return res.status(404).json({ error: 'Participants not found' });

      const event = await Event.findByPk(first.eventId);
      if (!event) return res.status(404).json({ error: 'Associated event not found' });
      if (req.user.role !== 'organizer' && event.organizerId !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }

      updated = await Participant.update(
        { checkedIn: true, checkedInAt: new Date() },
        { where: { id: { [Op.in]: ids } } }
      );
    } else {
      // query-based bulk update (e.g., { eventId: '...' })
      // validate permission based on eventId if provided
      if (query.eventId) {
        const event = await Event.findByPk(query.eventId);
        if (!event) return res.status(404).json({ error: 'Associated event not found' });
        if (req.user.role !== 'organizer' && event.organizerId !== req.user.id) {
          return res.status(403).json({ error: 'Access denied' });
        }
      }
      updated = await Participant.update(
        { checkedIn: true, checkedInAt: new Date() },
        { where: query }
      );
    }

    res.json({ message: 'Bulk check-in completed', result: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to perform bulk check-in' });
  }
};