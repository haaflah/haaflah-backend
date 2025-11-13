import { Event, User } from '../models/index.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/sequelize.js';

// ------------------------ GET PLATFORM STATS (ADMIN) ------------------------
export const getPlatformStats = async (req, res) => {
  try {
    const totalEvents = await Event.count();
    const totalUsers = await User.count();
    const totalOrganizers = await User.count({ where: { role: 'organizer' } });
    const activeEvents = await Event.count({ where: { status: 'published' } });
    const completedEvents = await Event.count({ where: { status: 'completed' } });
    const upcomingEvents = await Event.count({
      where: {
        status: 'published',
        date: { [Op.gt]: new Date() },
      },
    });

    const totalRegistrations = await Event.sum('totalRegistrations') || 0;
    const totalAttendees = await Event.sum('totalAttendees') || 0;

    const eventsByCategory = await Event.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['category'],
      raw: true,
    });

    const eventsByType = await Event.findAll({
      attributes: [
        'eventType',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['eventType'],
      raw: true,
    });

    res.json({
      stats: {
        totalEvents,
        totalUsers,
        totalOrganizers,
        activeEvents,
        completedEvents,
        upcomingEvents,
        totalRegistrations,
        totalAttendees,
        eventsByCategory,
        eventsByType,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch platform stats' });
  }
};

// ------------------------ GET MY STATS (ORGANIZER) ------------------------
export const getMyStats = async (req, res) => {
  try {
    const organizerId = req.user.id;

    const totalEvents = await Event.count({ where: { organizerId } });
    const publishedEvents = await Event.count({
      where: { organizerId, status: 'published' },
    });
    const draftEvents = await Event.count({
      where: { organizerId, status: 'draft' },
    });
    const completedEvents = await Event.count({
      where: { organizerId, status: 'completed' },
    });
    const upcomingEvents = await Event.count({
      where: {
        organizerId,
        status: 'published',
        date: { [Op.gt]: new Date() },
      },
    });

    const totalRegistrations = await Event.sum('totalRegistrations', {
      where: { organizerId },
    }) || 0;

    const totalAttendees = await Event.sum('totalAttendees', {
      where: { organizerId },
    }) || 0;

    

    const recentEvents = await Event.findAll({
      where: { organizerId },
      order: [['createdAt', 'DESC']],
      limit: 5,
      attributes: ['id', 'name', 'date', 'status', 'totalRegistrations', 'totalAttendees', 'capacity', 'venue'],
    });

    res.json({
      stats: {
        totalEvents,
        publishedEvents,
        draftEvents,
        completedEvents,
        upcomingEvents,
        totalRegistrations,
        totalAttendees,
        recentEvents,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch your stats' });
  }
};

// ------------------------ GET EVENT STATS ------------------------
export const getEventStats = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Check authorization
    if (event.organizerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const stats = {
      eventId: event.id,
      name: event.name,
      status: event.status,
      totalRegistrations: event.totalRegistrations,
      totalAttendees: event.totalAttendees,
      capacity: event.capacity,
      remainingSeats: event.capacity ? event.capacity - event.totalRegistrations : null,
      registrationRate: event.capacity
        ? ((event.totalRegistrations / event.capacity) * 100).toFixed(2)
        : 0,
      attendanceRate: event.totalRegistrations
        ? ((event.totalAttendees / event.totalRegistrations) * 100).toFixed(2)
        : 0,
      daysUntilEvent: event.date ? Math.ceil((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24)) : null,
    };

    res.json({ stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch event stats' });
  }
};


// ------------------------ GET EVENTS BY DATE RANGE ------------------------
export const getEventsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    const organizerId = req.user.id;
    const where = {
      organizerId,
      date: {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      },
    };

    const events = await Event.findAll({
      where,
      order: [['date', 'ASC']],
      attributes: ['id', 'name', 'date', 'status', 'totalRegistrations', 'totalAttendees'],
    });

    const summary = {
      totalEvents: events.length,
      totalRegistrations: events.reduce((sum, e) => sum + (e.totalRegistrations || 0), 0),
      totalAttendees: events.reduce((sum, e) => sum + (e.totalAttendees || 0), 0),
    };

    res.json({ summary, events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events by date range' });
  }
};
