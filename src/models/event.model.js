import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Event = sequelize.define('Event', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  
    // Organizer
    organizerId: { type: DataTypes.UUID, allowNull: false },
    
    // Basic Info
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    bannerUrl: DataTypes.STRING,
    
    // Date & Time
    date: { type: DataTypes.DATE, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    timezone: { type: DataTypes.STRING, defaultValue: 'UTC' },
    // Location
    venue: { type: DataTypes.STRING, allowNull: false },
    
    // Event Type & Category
    eventType: { 
      type: DataTypes.ENUM('physical', 'virtual', 'hybrid'), 
      defaultValue: 'physical' 
    },
    
    // Capacity & Registration
    capacity: {type: DataTypes.INTEGER, allowNull: true},
    registrationLink: DataTypes.STRING,
    registrationDeadline: DataTypes.DATE,
    
    // Features
    hasFaceIdCheckIn: { type: DataTypes.BOOLEAN, defaultValue: false },
    hasLiveStream: { type: DataTypes.BOOLEAN, defaultValue: false },
    liveStreamUrl: DataTypes.STRING,
    
    // Status
    status: { 
      type: DataTypes.ENUM( 'published', 'ongoing', 'completed', 'cancelled'), 
      defaultValue: 'published' 
    },
    
    
    // Engagement
    totalRegistrations: { type: DataTypes.INTEGER, defaultValue: 0 },
    totalAttendees: { type: DataTypes.INTEGER, defaultValue: 0 },
    
  });

  return Event;
};
