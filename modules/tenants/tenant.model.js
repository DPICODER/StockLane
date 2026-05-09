const {DataTypes } = require("sequelize");
const sequelize = require("../../core/db/database");


const tenant = sequelize.define('tenant',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    slug:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    plan: {
        type: DataTypes.ENUM('free', 'pro', 'max'),
        allowNull: false,
        defaultValue: 'free',
    },
    status:{
        type:DataTypes.ENUM('active','suspended','trial'),
        allowNull:false,
        defaultValue:"trial"
    }
},{
    timestamps:true,
    tableName:"tenant"
})

module.exports = tenant;