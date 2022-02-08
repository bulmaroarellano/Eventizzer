const db = require('../db/models');
const VacanciesDBApi = require('../db/api/vacancies');

module.exports = class VacanciesService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await VacanciesDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let vacancies = await VacanciesDBApi.findBy({ id }, { transaction });

      if (!vacancies) {
        throw new ValidationError('vacanciesNotFound');
      }

      await VacanciesDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return vacancies;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await VacanciesDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
