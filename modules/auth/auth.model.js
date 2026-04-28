const {DataTypes } = require("sequelize");
const sequelize = require("../../core/db/database");


const authModel = sequelize.define('auth',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password_hash:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type:DataTypes.ENUM,
        values:('SUPER_ADMIN','TENANT_ADMIN','STAFF'),
        defaultValue:"STAFF"
    },
    tenant_id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    last_login:{
        type:DataTypes.DATE,
        allowNull:true,
    }

},
{
    timestamps:true,
    tableName:'auth',
});


module.exports = authModel;