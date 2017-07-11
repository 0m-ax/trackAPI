//load express module
const express = require('express');
//create new router
var app = express.Router()
//respond with route properites
app.get('/',(req,res)=>{
    res.send(req.route)
})
//export router object
module.exports = app;