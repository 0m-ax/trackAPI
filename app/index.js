const express = require('express');
var app = express.Router()
app.use('/journey',require('./Journey'))
app.use('/route',require('./Route'))

module.exports = app;