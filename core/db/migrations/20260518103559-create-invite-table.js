'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('invites', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            tenant_id: {
                type: Sequelize.UUID,
                allowNull: false
            },
            role: {
                type: Sequelize.ENUM('TENANT_ADMIN', 'STAFF'),
                allowNull: false,
                defaultValue: 'STAFF'
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('pending', 'accepted', 'expired', 'revoked'),
                defaultValue: 'pending',
                allowNull: false
            },
            expires_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            invited_by: {
                type: Sequelize.UUID,
                allowNull: false
            },
            accepted_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('invites');
    }
};