const express = require('express');
var app = express();
app.use(express.static('./'))
app.use(require('body-parser').json());
app.use(require('./app'))
app.use('/debug',require('./debug'))
app.listen(3000)
