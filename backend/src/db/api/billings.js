
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class BillingsDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const billings = await db.billings.create(
  {
  id: data.id || undefined,

    product: data.product
    ||
    null
,

    price: data.price
    ||
    null
,

    amount: data.amount
    ||
    null
,

    subtotal: data.subtotal
    ||
    null
,

    iva: data.iva
    ||
    null
,

    discount: data.discount
    ||
    null
,

    total: data.total
    ||
    null
,

    payForm: data.payForm
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

    await billings.setClient(data.client || null, {
    transaction,
    });

  return billings;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const billings = await db.billings.findByPk(id, {
      transaction,
    });

    await billings.update(
      {

        product: data.product
        ||
        null
,

        price: data.price
        ||
        null
,

        amount: data.amount
        ||
        null
,

        subtotal: data.subtotal
        ||
        null
,

        iva: data.iva
        ||
        null
,

        discount: data.discount
        ||
        null
,

        total: data.total
        ||
        null
,

        payForm: data.payForm
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    await billings.setClient(data.client || null, {
      transaction,
    });

    return billings;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const billings = await db.billings.findByPk(id, options);

    await billings.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await billings.destroy({
      transaction
    });

    return billings;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const billings = await db.billings.findOne(
      { where },
      { transaction },
    );

    if (!billings) {
      return billings;
    }

    const output = billings.get({plain: true});

    output.client = await billings.getClient({
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
        as: 'client',
      },

    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.product) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'billings',
            'product',
            filter.product,
          ),
        };
      }

      if (filter.payForm) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'billings',
            'payForm',
            filter.payForm,
          ),
        };
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

      if (filter.amountRange) {
        const [start, end] = filter.amountRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            amount: {
              ...where.amount,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            amount: {
              ...where.amount,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.subtotalRange) {
        const [start, end] = filter.subtotalRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            subtotal: {
              ...where.subtotal,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            subtotal: {
              ...where.subtotal,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.ivaRange) {
        const [start, end] = filter.ivaRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            iva: {
              ...where.iva,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            iva: {
              ...where.iva,
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

      if (filter.totalRange) {
        const [start, end] = filter.totalRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            total: {
              ...where.total,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            total: {
              ...where.total,
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

      if (filter.client) {
        var listItems = filter.client.split('|').map(item => {
          return  Utils.uuid(item)
        });

        where = {
          ...where,
          clientId: {[Op.or]: listItems}
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

    let { rows, count } = await db.billings.findAndCountAll(
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
            'billings',
            'client',
            query,
          ),
        ],
      };
    }

    const records = await db.billings.findAll({
      attributes: [ 'id', 'client' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['client', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.client,
    }));
  }

};

