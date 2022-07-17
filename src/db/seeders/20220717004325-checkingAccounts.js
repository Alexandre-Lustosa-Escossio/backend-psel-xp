'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Checking_Accounts',
    [
      {
        customer_id: 1,
        balance: 50000
      },
    ], {timestamps: false})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Checking_Accounts', null, {});
  }
};
