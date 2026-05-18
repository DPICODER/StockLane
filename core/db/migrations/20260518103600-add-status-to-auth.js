'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('auth', 'status', {
            type: Sequelize.ENUM('active', 'inactive', 'suspended'),
            defaultValue: 'active',
            allowNull: false
        });
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('auth', 'status');
    }
};