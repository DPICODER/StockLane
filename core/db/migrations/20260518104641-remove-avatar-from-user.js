'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user','avatar');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('user','avatar',{
      type:Sequelize.TEXT,
      allowNull:true
    })
  }
};
