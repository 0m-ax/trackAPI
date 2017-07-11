//load express module
const express = require('express');
//create new router
var app = express.Router()
//load journey class
const Journey = require('_/journey');
//handle /:journeyID and load journey
app.use('/:journeyID',(req,res,next)=>{
    Journey.get(parseInt(req.params.journeyID)).then((journey)=>{
        //add journey to request object
        req.journey = journey;
        next()
    }).catch((error)=>{
        next(error)
    })
})
//handle /:journeyID and deligate
app.use('/:journeyID',require('./router.js'))
module.exports = app;