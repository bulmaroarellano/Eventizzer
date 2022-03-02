const db = require('../db/models');
const EmployesDBApi = require('../db/api/employes');

module.exports = class EmployesService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await EmployesDBApi.create(
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
      let employes = await EmployesDBApi.findBy(
        {id},
        {transaction},
      );

      if (!employes) {
        throw new ValidationError(
          'employesNotFound',
        );
      }

      await EmployesDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return employes;

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

      await EmployesDBApi.remove(
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

