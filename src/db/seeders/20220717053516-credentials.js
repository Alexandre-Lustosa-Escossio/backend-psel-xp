const handleHashes = require('../../utils/handleHashes');
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await handleHashes.hash('codigoxp');
    await queryInterface.bulkInsert('Credentials', [{
      customer_id: 1,
      password: passwordHash, 
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Credentials', null, {});
  },
};
