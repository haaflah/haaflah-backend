import {sequelize} from "../config/sequelize.js"
import userModel from './user.model.js';
// import eventModel from './event.model.js';
// import participantModel from './participant.model.js';
import passwordResetModel from './passwordReset.model.js';

const User = userModel(sequelize);
const PasswordReset = passwordResetModel(sequelize);

User.hasMany(PasswordReset, { foreignKey: 'userId', as: 'passwordResets' });
PasswordReset.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { sequelize, User, PasswordReset };
