const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const customers = sequelize.define(
    'customers',
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

email: {
        type: DataTypes.TEXT,

      },

phone: {
        type: DataTypes.INTEGER,

      },

orders: {
        type: DataTypes.TEXT,

      },

address1: {
        type: DataTypes.TEXT,

      },

address2: {
        type: DataTypes.TEXT,

      },

city: {
        type: DataTypes.TEXT,

      },

state: {
        type: DataTypes.TEXT,

      },

lat: {
        type: DataTypes.TEXT,

      },

long: {
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

  customers.associate = (db) => {

    db.customers.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.customers.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return customers;
};

