const { DataTypes } = require("sequelize");
const sequelize = require("../../core/db/database");

const invite = sequelize.define("invite", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tenant_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('TENANT_ADMIN', 'STAFF'),
        allowNull: false,
        defaultValue: "STAFF"
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'expired', 'revoked'),
        defaultValue: "pending",
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    invited_by: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    accepted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: "invites",
    timestamps: true
});

module.exports = invite
