'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('credentials', {
      customer_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'customer_id',
        references: {
          model: 'customers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      password: {
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('creadentials');
  }
};