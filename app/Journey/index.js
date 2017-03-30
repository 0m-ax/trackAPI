const express = require('express');
var app = express.Router()
const Journey = require('_/journey');
app.use('/:journeyID',(req,res,next)=>{
    Journey.get(parseInt(req.params.journeyID)).then((journey)=>{
        req.journey = journey;
        next()
    }).catch((error)=>{
        next(error)
    })
})
app.use('/:journeyID',require('./router.js'))
module.exports = app;