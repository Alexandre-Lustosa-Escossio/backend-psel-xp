'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('asset_customers',
      [
        {
          customer_id: 1,
          asset_id: 1,
          quantity: 30
        },
        {
          customer_id: 1,
          asset_id: 2,
          quantity: 10
        },
        {
          customer_id: 2,
          asset_id: 2,
          quantity: 60
        }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('asset_customers', null, {});  }
};
