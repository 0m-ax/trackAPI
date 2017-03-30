const express = require('express');
var app = express.Router()
const Route = require('_/route');
/*
require('_/journey').get(0)
.then((journey)=>journey.predictLocation(25))
.then((location)=>console.log(location))
*/
app.use('/:routeID',(req,res,next)=>{
    Route.get(parseInt(req.params.routeID)).then((route)=>{
        req.route = route;
        next()
    }).catch((error)=>{
        next(error)
    })
})
app.use('/:routeID',require('./router.js'))

module.exports = app;