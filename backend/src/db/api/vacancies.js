const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class VacanciesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const vacancies = await db.vacancies.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        link: data.link || null,
        company: data.company || null,
        date_application: data.date_application || null,
        interest: data.interest || null,
        notes: data.notes || null,
        salary_from: data.salary_from || null,
        salary_to: data.salary_to || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await vacancies.setUser_id(data.user_id || null, {
      transaction,
    });

    return vacancies;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const vacancies = await db.vacancies.findByPk(id, {
      transaction,
    });

    await vacancies.update(
      {
        title: data.title || null,
        link: data.link || null,
        company: data.company || null,
        date_application: data.date_application || null,
        interest: data.interest || null,
        notes: data.notes || null,
        salary_from: data.salary_from || null,
        salary_to: data.salary_to || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await vacancies.setUser_id(data.user_id || null, {
      transaction,
    });

    return vacancies;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const vacancies = await db.vacancies.findByPk(id, options);

    await vacancies.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await vacancies.destroy({
      transaction,
    });

    return vacancies;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const vacancies = await db.vacancies.findOne({ where }, { transaction });

    if (!vacancies) {
      return vacancies;
    }

    const output = vacancies.get({ plain: true });

    output.user_id = await vacancies.getUser_id({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    if (filter.page != 1 && filter.page) {
      const currentPage = +filter.page - 1;
      offset = currentPage * limit;
    }
    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user_id',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('vacancies', 'title', filter.title),
        };
      }

      if (filter.link) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('vacancies', 'link', filter.link),
        };
      }

      if (filter.company) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('vacancies', 'company', filter.company),
        };
      }

      if (filter.notes) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('vacancies', 'notes', filter.notes),
        };
      }

      if (filter.salary_from) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('vacancies', 'salary_from', filter.salary_from),
        };
      }

      if (filter.salary_to) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('vacancies', 'salary_to', filter.salary_to),
        };
      }

      if (filter.date_applicationRange) {
        const [start, end] = filter.date_applicationRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date_application: {
              ...where.date_application,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date_application: {
              ...where.date_application,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.interestRange) {
        const [start, end] = filter.interestRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            interest: {
              ...where.interest,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            interest: {
              ...where.interest,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.user_id) {
        var listItems = filter.user_id.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          user_idId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = await db.vacancies.findAndCountAll({
      where,
      include,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: orderBy ? [orderBy.split('_')] : [['createdAt', 'DESC']],
      transaction,
    });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('vacancies', 'title', query),
        ],
      };
    }

    const records = await db.vacancies.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
