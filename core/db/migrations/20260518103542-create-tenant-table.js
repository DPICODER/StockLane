'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tenant', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            plan: {
                type: Sequelize.ENUM('free', 'pro', 'max'),
                allowNull: false,
                defaultValue: 'free'
            },
            status: {
                type: Sequelize.ENUM('active', 'suspended', 'trial'),
                allowNull: false,
                defaultValue: 'trial'
            },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('tenant');
    }
};