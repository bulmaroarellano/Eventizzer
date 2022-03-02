
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class EventsDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const events = await db.events.create(
  {
  id: data.id || undefined,

    date: data.date
    ||
    null
,

    name: data.name
    ||
    null
,

    price: data.price
    ||
    null
,

    address: data.address
    ||
    null
,

    billingId: data.billingId
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return events;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const events = await db.events.findByPk(id, {
      transaction,
    });

    await events.update(
      {

        date: data.date
        ||
        null
,

        name: data.name
        ||
        null
,

        price: data.price
        ||
        null
,

        address: data.address
        ||
        null
,

        billingId: data.billingId
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return events;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const events = await db.events.findByPk(id, options);

    await events.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await events.destroy({
      transaction
    });

    return events;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const events = await db.events.findOne(
      { where },
      { transaction },
    );

    if (!events) {
      return events;
    }

    const output = events.get({plain: true});

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

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'events',
            'name',
            filter.name,
          ),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'events',
            'address',
            filter.address,
          ),
        };
      }

      if (filter.billingId) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'events',
            'billingId',
            filter.billingId,
          ),
        };
      }

      if (filter.dateRange) {
        const [start, end] = filter.dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date: {
              ...where.date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
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
          active:
            filter.active === true ||
            filter.active === 'true',
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

    let { rows, count } = await db.events.findAndCountAll(
      {
        where,
        include,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: orderBy
          ? [orderBy.split('_')]
          : [['createdAt', 'DESC']],
        transaction,
      },
    );

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
          Utils.ilike(
            'events',
            'date',
            query,
          ),
        ],
      };
    }

    const records = await db.events.findAll({
      attributes: [ 'id', 'date' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['date', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.date,
    }));
  }

};

