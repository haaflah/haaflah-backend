import { Participant, Event } from '../models/index.js';
import { Op } from 'sequelize';

// Register a participant for an event (public)
export const registerParticipant = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.capacity === event.totalRegistrations && event.capacity !== null) return res.status(400).json({ error: 'Event has reached full capacity' })
    if (event.status === 'completed') return res.status(400).json({ error: 'Cannot register for acompleted event' });
    if (event.status === 'cancelled') return res.status(400).json({ error: 'Cannot register for a cancelled event' });
    if (new Date(event.date) < new Date()) return res.status(400).json({ error: 'Cannot register for past event' });
    if (event.registrationDeadline && new Date(event.registrationDeadline) < new Date()) {
      return res.status(400).json({ error: 'Registration deadline has passed' });
    }

    const payload = {
      ...req.body,
      eventId,
    };

    const participant = await Participant.create(payload);

    // Increment total registrations on event
    await event.increment('totalRegistrations', { by: 1 });

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

    event.increment('totalAttendees', { by: 1 });
    res.status(200).json({ message: `${participant.firstName} Participant checked in` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to check in participant' });
  }
};

// Bulk check-in (protected) - accepts { ids: [] } or { query: {...} }
export const bulkCheckIn = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'Provide ids array' });
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

      event.increment('totalAttendees', { by: ids.length });
    } 
    res.json({ message: 'Bulk check-in completed', result: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to perform bulk check-in' });
  }
};