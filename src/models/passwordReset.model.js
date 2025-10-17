import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const PasswordReset = sequelize.define('PasswordReset', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
  });

  return PasswordReset;
};
