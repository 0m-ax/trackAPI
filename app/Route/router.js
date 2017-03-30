const express = require('express');
var app = express.Router()
app.get('/',(req,res)=>{
    res.send(req.route)
})
module.exports = app;