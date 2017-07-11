//load express module
const express = require('express');
//create new router
var app = express.Router()
//respond with route properites
app.get('/',(req,res)=>{
    res.send(req.journey)
})
//call getPoints function on journey
app.get('/getPoints',(req,res,next)=>{
    req.journey.getPoints().then((points)=>{
        res.send(points)
    }).catch((error)=>{
        next(error)
    })
})
//call predictLocation function on journey with time permiter
app.get('/predictLocation/:time',(req,res,next)=>{
    req.journey.predictLocation(parseInt(req.params.time)).then((location)=>{
        res.send(location)
    }).catch((error)=>{
        next(error)
    })
})
//call getReports function on journey
app.get('/getReports/',(req,res,next)=>{
    req.journey.getReports().then((reports)=>{
        res.send(reports)
    }).catch((error)=>{
        next(error)
    })
})
//call createReport on journey creating a report
app.post('/report',(req,res,next)=>{
    req.journey.createReport(req.body.location,req.body.time);
})
module.exports = app;