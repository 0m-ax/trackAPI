//load express module
const express = require('express');
//create new router
var app = express.Router()
//define /journey route and deliate
app.use('/journey',require('./Journey'))
//define /route route and deligate 
app.use('/route',require('./Route'))
//export router object
module.exports = app;