const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const events = sequelize.define(
    'events',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

date: {
        type: DataTypes.DATE,

      },

name: {
        type: DataTypes.TEXT,

      },

price: {
        type: DataTypes.DECIMAL,

      },

address: {
        type: DataTypes.TEXT,

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

  events.associate = (db) => {

    db.events.belongsTo(db.billings, {
      as: 'billingId',
      constraints: false,
    });

    db.events.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.events.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return events;
};

