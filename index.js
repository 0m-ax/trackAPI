//load express module
const express = require('express');
//create new express app
var app = express();
//load body-parese middleware to handle post request
app.use(require('body-parser').json());
//load app
app.use(require('./app'))
//start express http server on port 3000
app.listen(3000)
module.exports = app; // for testing
