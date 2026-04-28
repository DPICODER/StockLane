const {DataTypes } = require("sequelize");
const sequelize = require("../../core/db/database");


const tenant = sequelize.define('tenant',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    plan:{
        type:DataTypes.ENUM,
        values:("free","pro","max"),
        allowNull: false,
        defaultValue: "free",
    }
},{
    timestamps:true,
    tableName:"tenant"
})

module.exports = tenant;