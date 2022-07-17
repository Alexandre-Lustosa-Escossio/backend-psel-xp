'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('Asset_Customers',
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
    await queryInterface.bulkDelete('Asset_Customers', null, {});  }
};
