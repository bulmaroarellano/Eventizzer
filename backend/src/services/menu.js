const db = require('../db/models');
const MenuDBApi = require('../db/api/menu');

module.exports = class MenuService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await MenuDBApi.create(
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
      let menu = await MenuDBApi.findBy(
        {id},
        {transaction},
      );

      if (!menu) {
        throw new ValidationError(
          'menuNotFound',
        );
      }

      await MenuDBApi.update(
        id,
        data,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
      return menu;

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

      await MenuDBApi.remove(
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

