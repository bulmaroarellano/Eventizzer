const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const employes = sequelize.define(
    'employes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

name: {
        type: DataTypes.TEXT,

      },

lastName: {
        type: DataTypes.TEXT,

      },

roleId: {
        type: DataTypes.INTEGER,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  employes.associate = (db) => {

    db.employes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.employes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return employes;
};

