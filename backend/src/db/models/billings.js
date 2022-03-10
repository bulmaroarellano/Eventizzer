const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const billings = sequelize.define(
    'billings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

product: {
        type: DataTypes.TEXT,

      },

price: {
        type: DataTypes.DECIMAL,

      },

amount: {
        type: DataTypes.DECIMAL,

      },

subtotal: {
        type: DataTypes.DECIMAL,

      },

iva: {
        type: DataTypes.DECIMAL,

      },

discount: {
        type: DataTypes.DECIMAL,

      },

total: {
        type: DataTypes.DECIMAL,

      },

payForm: {
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

  billings.associate = (db) => {

    db.billings.belongsTo(db.customers, {
      as: 'client',
      constraints: false,
    });

    db.billings.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.billings.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return billings;
};

