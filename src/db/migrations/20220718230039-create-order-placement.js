'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_Placements', {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          foreignKey: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      asset_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Assets',
          foreignKey: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order_Placements');
  }
};