import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Participant = sequelize.define('Participant', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    
    // Personal Info
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: DataTypes.STRING,
    
    // Event Registration
    eventId: { type: DataTypes.UUID, allowNull: false },
    registrationDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    
    // Status
    status: { 
      type: DataTypes.ENUM('registered', 'attended', 'no-show'), 
      defaultValue: 'registered' 
    },
    
    // Check-in
    checkedIn: { type: DataTypes.BOOLEAN, defaultValue: false },
    checkInTime: DataTypes.DATE,
    checkInMethod: { 
      type: DataTypes.ENUM('manual', 'qr-code', 'face-id'), 
      defaultValue: 'manual' 
    },
    
    // Face ID
    faceEmbedding: DataTypes.JSONB, // Store face recognition data
    profilePhotoUrl: DataTypes.STRING,
    
    
    ticketNumber: { type: DataTypes.STRING, unique: true },
   
    
    // Engagement
    feedbackSubmitted: { type: DataTypes.BOOLEAN, defaultValue: false },
    rating: DataTypes.INTEGER, // 1-5 stars
    feedback: DataTypes.TEXT,
    
    // Meta
    source: { type: DataTypes.STRING, defaultValue: 'direct' }, 
  });

  return Participant;
};
