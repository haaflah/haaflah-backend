import { Event, User } from '../models/index.js';
import { Op, where } from 'sequelize';

// ------------------------ CREATE EVENT ------------------------


export const createEvent = async (req, res) => {
  try {
    const organizerId = req.user.id;

    // 1️⃣ Create event
    const eventData = {
      ...req.body,
      organizerId,
    };

    const createdEvent = await Event.create(eventData);

    // 2️⃣ Generate registration link
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5000";
    const registrationLink = `${baseUrl}/register/${createdEvent.id}`;

    // 3️⃣ Update the event record
    await createdEvent.update({ registrationLink });

    // 4️⃣ Fetch the event with organizer details
    const event = await Event.findByPk(createdEvent.id, {
      include: [{ model: User, as: "organizer", attributes: ["id", "name", "email"] }],
    });

    // 5️⃣ Return it
    res.status(201).json({ event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event" });
  }
};


// ------------------------ GET ALL EVENTS ------------------------
export const getAllEvents = async (req, res) => {
  try {
    const { status, category, eventType, isPublic, search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (eventType) where.eventType = eventType;
    if (isPublic !== undefined) where.isPublic = isPublic === 'true';
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Event.findAndCountAll({
      where,
      include: [{ model: User, as: 'organizer', attributes: ['id', 'name', 'email'] }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['date', 'ASC']],
    });

    res.json({
      events: rows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// ------------------------ GET EVENT BY ID ------------------------
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id, {
      include: [{ model: User, as: 'organizer', attributes: ['id', 'name', 'email'] }],
    });

    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// ------------------------ UPDATE EVENT ------------------------
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.organizerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    await event.update(req.body);
    res.json({ event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// ------------------------ DELETE EVENT ------------------------
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.organizerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    await event.destroy();
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

// ------------------------ GET MY EVENTS ------------------------
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { organizerId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json({ events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch your events' });
  }
};
