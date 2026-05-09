const {DataTypes } = require("sequelize");
const sequelize = require("../../core/db/database");


const user = sequelize.define('user',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    tenant_id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    auth_id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
},{
    timestamps:true,
    tableName:"user"
})

module.exports = user;