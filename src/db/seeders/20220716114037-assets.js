'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('Assets',
    [
      {
        asset_code: 'xpbr31',
        asset_name: 'XP INC (BDR)'
      },
      {
        asset_code: 'itub3',
        asset_name: 'Itau (ON)'
      }
    ],{timestamps: false})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('assets', null, {});
     
  }
};
