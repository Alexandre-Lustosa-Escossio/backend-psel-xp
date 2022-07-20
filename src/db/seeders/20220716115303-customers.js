module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Customers',
    [
      {
        customer_name: 'Guilherme Benchimol',
        email: 'guilherme.benchimol@xp.inc',
      },
      {
        customer_name: 'Thiago Maffra',
        email: 'thiago.maffra@xp.inc',
      },
    ], { timestamps: false });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Customers', null, {});
  },
};
