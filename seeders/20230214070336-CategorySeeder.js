'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MstCategories', [
      {
        name: 'ISP',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'WI',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'FORM',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MstCategories', null, {});
  }
};
