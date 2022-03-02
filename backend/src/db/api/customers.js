
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CustomersDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const customers = await db.customers.create(
  {
  id: data.id || undefined,

    name: data.name
    ||
    null
,

    lastName: data.lastName
    ||
    null
,

    email: data.email
    ||
    null
,

    phone: data.phone
    ||
    null
,

    orders: data.orders
    ||
    null
,

    address1: data.address1
    ||
    null
,

    address2: data.address2
    ||
    null
,

    city: data.city
    ||
    null
,

    state: data.state
    ||
    null
,

    lat: data.lat
    ||
    null
,

    long: data.long
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return customers;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const customers = await db.customers.findByPk(id, {
      transaction,
    });

    await customers.update(
      {

        name: data.name
        ||
        null
,

        lastName: data.lastName
        ||
        null
,

        email: data.email
        ||
        null
,

        phone: data.phone
        ||
        null
,

        orders: data.orders
        ||
        null
,

        address1: data.address1
        ||
        null
,

        address2: data.address2
        ||
        null
,

        city: data.city
        ||
        null
,

        state: data.state
        ||
        null
,

        lat: data.lat
        ||
        null
,

        long: data.long
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return customers;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const customers = await db.customers.findByPk(id, options);

    await customers.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await customers.destroy({
      transaction
    });

    return customers;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const customers = await db.customers.findOne(
      { where },
      { transaction },
    );

    if (!customers) {
      return customers;
    }

    const output = customers.get({plain: true});

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
            'customers',
            'name',
            filter.name,
          ),
        };
      }

      if (filter.lastName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customers',
            'lastName',
            filter.lastName,
          ),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customers',
            'email',
            filter.email,
          ),
        };
      }

      if (filter.orders) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customers',
            'orders',
            filter.orders,
          ),
        };
      }

      if (filter.address1) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customers',
            'address1',
            filter.address1,
          ),
        };
      }

      if (filter.address2) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customers',
            'address2',
            filter.address2,
          ),
        };
      }

      if (filter.city) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customers',
            'city',
            filter.city,
          ),
        };
      }

      if (filter.state) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customers',
            'state',
            filter.state,
          ),
        };
      }

      if (filter.lat) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customers',
            'lat',
            filter.lat,
          ),
        };
      }

      if (filter.long) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'customers',
            'long',
            filter.long,
          ),
        };
      }

      if (filter.phoneRange) {
        const [start, end] = filter.phoneRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            phone: {
              ...where.phone,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            phone: {
              ...where.phone,
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

    let { rows, count } = await db.customers.findAndCountAll(
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
            'customers',
            'name',
            query,
          ),
        ],
      };
    }

    const records = await db.customers.findAll({
      attributes: [ 'id', 'name' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }

};

