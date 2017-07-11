//load express module
const express = require('express');
//create new router
var app = express.Router()
//load route class
const Route = require('_/route');
//handle /routeID route
app.use('/:routeID',(req,res,next)=>{
    //load route instance
    Route.get(parseInt(req.params.routeID)).then((route)=>{
        //add route to request object
        req.route = route;
        next()
    }).catch((error)=>{
        next(error)
    })
})
//deligate /routeID route 
app.use('/:routeID',require('./router.js'))
//export router object
module.exports = app;