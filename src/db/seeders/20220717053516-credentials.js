'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Credentials', [{
      customer_id: 1,
      password: 'codigoxp'
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Credentials', null, {});
  }
};
