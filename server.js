const express = require('express');
require('dotenv').config({'quite':true});
const app = express();

const port = process.env.APP_PORT || 3000;


app.get('/',(req,res)=>{
    res.send("Server is up")
})

app.listen(port,()=>{
    console.log(`Server is live @ http://localhost:${port}`);
})

module.exports = app;