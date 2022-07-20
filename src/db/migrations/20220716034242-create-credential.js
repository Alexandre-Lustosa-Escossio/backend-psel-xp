module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Credentials', {
      customer_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'customer_id',
        references: {
          model: 'Customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      password: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Credentials');
  },
};