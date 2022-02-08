const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const vacancies = sequelize.define(
    'vacancies',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      link: {
        type: DataTypes.TEXT,
      },

      company: {
        type: DataTypes.TEXT,
      },

      date_application: {
        type: DataTypes.DATE,
      },

      interest: {
        type: DataTypes.INTEGER,
      },

      notes: {
        type: DataTypes.TEXT,
      },

      salary_from: {
        type: DataTypes.TEXT,
      },

      salary_to: {
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

  vacancies.associate = (db) => {
    db.vacancies.belongsTo(db.users, {
      as: 'user_id',
      constraints: false,
    });

    db.vacancies.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.vacancies.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return vacancies;
};
