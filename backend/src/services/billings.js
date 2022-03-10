const db = require('../db/models');
const BillingsDBApi = require('../db/api/billings');

module.exports = class BillingsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await BillingsDBApi.create(
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
      let billings = await BillingsDBApi.findBy(
        {id},
        {transaction},
      );

      if (!billings) {
        throw new ValidationError(
          'billingsNotFound',
        );
      }

      await BillingsDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return billings;

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

      await BillingsDBApi.remove(
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

