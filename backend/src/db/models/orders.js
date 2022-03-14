const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const orders = sequelize.define(
    'orders',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

quantity: {
        type: DataTypes.INTEGER,

      },

discount: {
        type: DataTypes.DECIMAL,

      },

totalPrice: {
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

  orders.associate = (db) => {

    db.orders.belongsTo(db.customers, {
      as: 'customer',
      constraints: false,
    });

    db.orders.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.orders.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return orders;
};

