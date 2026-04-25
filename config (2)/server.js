const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config({'quite':true});
const app = express();
const port = process.env.APP_PORT || 3000;


app.get('/',(req,res)=>{
    res.send("Server is up")
})

function connectDb(){

    console.log("ENV CHECK:", {
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
});

    sequelize.authenticate().then(()=>{
        console.log("DB authenticated !!"),
        sequelize.sync().then(()=>{
            console.log("DB synced !!")
        }
        ).catch((err)=>{
            console.log("DB sync failed X",err.parent)
        })
    }
    ).catch((err)=>{console.log("DB auth failed X",err)})
}

app.listen(port,()=>{
    connectDb();
    console.log(`Server is live @ http://localhost:${port}`);
})

module.exports = app;