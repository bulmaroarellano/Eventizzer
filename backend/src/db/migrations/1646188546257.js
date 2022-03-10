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

                    await queryInterface.createTable('billings', {
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
                      'billings',
                      'clientId',
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
                      'billings',
                      'product',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'billings',
                      'price',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'billings',
                      'amount',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'billings',
                      'subtotal',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'billings',
                      'iva',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'billings',
                      'discount',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'billings',
                      'total',
                      {
                          type: Sequelize.DataTypes.DECIMAL,

                      },
                      { transaction }
                    );

                    await queryInterface.addColumn(
                      'billings',
                      'payForm',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'events',
                        'billingId',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'events',
                      'billingIdId',
                      {
                          type: Sequelize.DataTypes.UUID,

                            references: {
                                model: 'billings',
                                key: 'id',
                            },

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
                        'billingIdId',
                        { transaction }
                    );

                    await queryInterface.addColumn(
                      'events',
                      'billingId',
                      {
                          type: Sequelize.DataTypes.TEXT,

                      },
                      { transaction }
                    );

                    await queryInterface.removeColumn(
                        'billings',
                        'payForm',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'billings',
                        'total',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'billings',
                        'discount',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'billings',
                        'iva',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'billings',
                        'subtotal',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'billings',
                        'amount',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'billings',
                        'price',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'billings',
                        'product',
                        { transaction }
                    );

                    await queryInterface.removeColumn(
                        'billings',
                        'clientId',
                        { transaction }
                    );

                    await queryInterface.dropTable('billings', { transaction });

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
