
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class OrdersDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const orders = await db.orders.create(
  {
  id: data.id || undefined,

    quantity: data.quantity
    ||
    null
,

    discount: data.discount
    ||
    null
,

    totalPrice: data.totalPrice
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await orders.setCustomer(data.customer || null, {
    transaction,
    });

    await orders.setProduct(data.product || null, {
    transaction,
    });

  return orders;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findByPk(id, {
      transaction,
    });

    await orders.update(
      {

        quantity: data.quantity
        ||
        null
,

        discount: data.discount
        ||
        null
,

        totalPrice: data.totalPrice
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await orders.setCustomer(data.customer || null, {
      transaction,
    });

    await orders.setProduct(data.product || null, {
      transaction,
    });

    return orders;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findByPk(id, options);

    await orders.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await orders.destroy({
      transaction
    });

    return orders;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const orders = await db.orders.findOne(
      { where },
      { transaction },
    );

    if (!orders) {
      return orders;
    }

    const output = orders.get({plain: true});

    output.customer = await orders.getCustomer({
      transaction
    });

    output.product = await orders.getProduct({
      transaction
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
        model: db.customers,
        as: 'customer',
      },

      {
        model: db.menu,
        as: 'product',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.quantityRange) {
        const [start, end] = filter.quantityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.discountRange) {
        const [start, end] = filter.discountRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            discount: {
              ...where.discount,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            discount: {
              ...where.discount,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.totalPriceRange) {
        const [start, end] = filter.totalPriceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            totalPrice: {
              ...where.totalPrice,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            totalPrice: {
              ...where.totalPrice,
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

      if (filter.customer) {
        var listItems = filter.customer.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          customerId: {[Op.or]: listItems}
        };
      }

      if (filter.product) {
        var listItems = filter.product.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          productId: {[Op.or]: listItems}
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

    let { rows, count } = await db.orders.findAndCountAll(
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
            'orders',
            'quantity',
            query,
          ),
        ],
      };
    }

    const records = await db.orders.findAll({
      attributes: [ 'id', 'quantity' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['quantity', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.quantity,
    }));
  }

};

