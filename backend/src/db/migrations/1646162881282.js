module.exports = {
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async up(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.renameColumn(
                        'menu',
                        'field',
                        'name',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'menu',
                      'itemPrice',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'menu',
                      'description',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'menu',
                      'available',
                      {
                          type: Sequelize.DataTypes.BOOLEAN,

                            defaultValue: false,
                            allowNull: false,

                      },
                      { transaction }
                    );

                    await queryInterface.renameTable(
                      'table',
                      'menu',
                      { transaction }
                    );

                    await queryInterface.createTable('orders', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                            unique: true,
                        },
                    }, { transaction });

                    await queryInterface.addColumn(
                      'orders',
                      'quantity',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'orders',
                      'discount',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'orders',
                      'totalPrice',
                      {
                          type: Sequelize.DataTypes.INTEGER,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'orders',
                      'customerId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'customers',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'orders',
                      'productId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'menu',
                                key: 'id',
                            },

                      },
                      { transaction }
                    );

                    await queryInterface.createTable('administrator', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                            unique: true,
                        },
                    }, { transaction });

                    await queryInterface.addColumn(
                      'administrator',
                      'role',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'administrator',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'administrator',
                      'lastName',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'administrator',
                      'userName',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'administrator',
                      'password',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.createTable('companies', {
                        id: {
                            type: Sequelize.DataTypes.UUID,
                            defaultValue: Sequelize.DataTypes.UUIDV4,
                            primaryKey: true,
                        },
                        createdById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        updatedById: {
                            type: Sequelize.DataTypes.UUID,
                            references: {
                                key: 'id',
                                model: 'users',
                            },
                        },
                        createdAt: { type: Sequelize.DataTypes.DATE },
                        updatedAt: { type: Sequelize.DataTypes.DATE },
                        deletedAt: { type: Sequelize.DataTypes.DATE },
                        importHash: {
                            type: Sequelize.DataTypes.STRING(255),
                            allowNull: true,
                            unique: true,
                        },
                    }, { transaction });

                    await queryInterface.addColumn(
                      'companies',
                      'name',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'companies',
                      'address',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'events',
                      'date',
                      {
                          type: Sequelize.DataTypes.DATE,

                      },
                      { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    /**
     * @param {QueryInterface} queryInterface
     * @param {Sequelize} Sequelize
     * @returns {Promise<void>}
     */
    async down(queryInterface, Sequelize) {
        /**
         * @type {Transaction}
         */
        const transaction = await queryInterface.sequelize.transaction();
        try {

                    await queryInterface.removeColumn(
                        'events',
                        'date',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'companies',
                        'address',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'companies',
                        'name',
                        { transaction }
                    );

                    await queryInterface.dropTable('companies', { transaction });

                    await queryInterface.removeColumn(
                        'administrator',
                        'password',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'administrator',
                        'userName',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'administrator',
                        'lastName',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'administrator',
                        'name',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'administrator',
                        'role',
                        { transaction }
                    );

                    await queryInterface.dropTable('administrator', { transaction });

                    await queryInterface.removeColumn(
                        'orders',
                        'productId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'orders',
                        'customerId',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'orders',
                        'totalPrice',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'orders',
                        'discount',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'orders',
                        'quantity',
                        { transaction }
                    );

                    await queryInterface.dropTable('orders', { transaction });

                    await queryInterface.renameTable(
                      'menu',
                      'table',
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'menu',
                        'available',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'menu',
                        'description',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'menu',
                        'itemPrice',
                        { transaction }
                    );

                    await queryInterface.renameColumn(
                        'menu',
                        'name',
                        'field',
                        { transaction }
                    );

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
