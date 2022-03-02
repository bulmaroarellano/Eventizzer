
const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AdministratorDBApi {

  static async create(data, options) {
  const currentUser = (options && options.currentUser) || { id: null };
  const transaction = (options && options.transaction) || undefined;

  const administrator = await db.administrator.create(
  {
  id: data.id || undefined,

    role: data.role
    ||
    null
,

    name: data.name
    ||
    null
,

    lastName: data.lastName
    ||
    null
,

    userName: data.userName
    ||
    null
,

    password: data.password
    ||
    null
,

  importHash: data.importHash || null,
  createdById: currentUser.id,
  updatedById: currentUser.id,
  },
  { transaction },
  );

  return administrator;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const administrator = await db.administrator.findByPk(id, {
      transaction,
    });

    await administrator.update(
      {

        role: data.role
        ||
        null
,

        name: data.name
        ||
        null
,

        lastName: data.lastName
        ||
        null
,

        userName: data.userName
        ||
        null
,

        password: data.password
        ||
        null
,

        updatedById: currentUser.id,
      },
      {transaction},
    );

    return administrator;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const administrator = await db.administrator.findByPk(id, options);

    await administrator.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await administrator.destroy({
      transaction
    });

    return administrator;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const administrator = await db.administrator.findOne(
      { where },
      { transaction },
    );

    if (!administrator) {
      return administrator;
    }

    const output = administrator.get({plain: true});

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

      if (filter.role) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'administrator',
            'role',
            filter.role,
          ),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'administrator',
            'name',
            filter.name,
          ),
        };
      }

      if (filter.lastName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'administrator',
            'lastName',
            filter.lastName,
          ),
        };
      }

      if (filter.userName) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'administrator',
            'userName',
            filter.userName,
          ),
        };
      }

      if (filter.password) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'administrator',
            'password',
            filter.password,
          ),
        };
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

    let { rows, count } = await db.administrator.findAndCountAll(
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
            'administrator',
            'role',
            query,
          ),
        ],
      };
    }

    const records = await db.administrator.findAll({
      attributes: [ 'id', 'role' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['role', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.role,
    }));
  }

};

