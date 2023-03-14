"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("MstUsers", [
      {
        username: "admin",
        fullname: "Administrator",
        email: "admin@gmail.com",
        userLevel: "Admin",
        password:
          "$2a$12$nNW7oDhxFUTRa75CtSiaLuQhKw9VPKwk59xtd1YM7pZsX07Ph/TYW",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
