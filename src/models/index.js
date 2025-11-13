import {sequelize} from "../config/sequelize.js"
import userModel from './user.model.js';
import eventModel from './event.model.js';
// import participantModel from './participant.model.js';
import passwordResetModel from './passwordReset.model.js';
// import formIntegrationModel from './formIntegration.model.js';
// import streamModel from './stream.model.js';
// import streamDestinationModel from './streamDestination.model.js';

const User = userModel(sequelize);
const Event = eventModel(sequelize);
// const Participant = participantModel(sequelize);
const PasswordReset = passwordResetModel(sequelize);
// const FormIntegration = formIntegrationModel(sequelize);
// const Stream = streamModel(sequelize);
// const StreamDestination = streamDestinationModel(sequelize);

// Associations
User.hasMany(PasswordReset, { foreignKey: 'userId', as: 'passwordResets' });
PasswordReset.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Event, { foreignKey: 'organizerId', as: 'events' });
Event.belongsTo(User, { foreignKey: 'organizerId', as: 'organizer' });

// Event.hasMany(Participant, { foreignKey: 'eventId', as: 'participants' });
// Participant.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

// Integrations
// User.hasMany(FormIntegration, { foreignKey: 'organizerId', as: 'formIntegrations' });
// FormIntegration.belongsTo(User, { foreignKey: 'organizerId', as: 'organizer' });

// Event.hasMany(FormIntegration, { foreignKey: 'eventId', as: 'formIntegrations' });
// FormIntegration.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

// Streaming
// Event.hasOne(Stream, { foreignKey: 'eventId', as: 'stream' });
// Stream.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

// Stream.hasMany(StreamDestination, { foreignKey: 'streamId', as: 'destinations' });
// StreamDestination.belongsTo(Stream, { foreignKey: 'streamId', as: 'stream' });

export { sequelize, User, Event, PasswordReset };
