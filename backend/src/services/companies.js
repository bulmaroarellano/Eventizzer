const db = require('../db/models');
const CompaniesDBApi = require('../db/api/companies');

module.exports = class CompaniesService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await CompaniesDBApi.create(
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let companies = await CompaniesDBApi.findBy(
        {id},
        {transaction},
      );

      if (!companies) {
        throw new ValidationError(
          'companiesNotFound',
        );
      }

      await CompaniesDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return companies;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await CompaniesDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

