'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Products', [
      {
      name: 'yamaha mt09',
      price: 15000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'yamaha mt07',
      price: 10000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'bmw s1000rr',
      price: 24000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'yamaha rd350',
      price: 16000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'yamaha rd500',
      price: 16000,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
