const express = require('express');
var app = express.Router()
app.get('/',(req,res)=>{
    res.send(req.journey)
})
app.get('/getPoints',(req,res,next)=>{
    req.journey.getPoints().then((points)=>{
        res.send(points)
    }).catch((error)=>{
        next(error)
    })
})
app.get('/predictLocation/:time',(req,res,next)=>{
    req.journey.predictLocation(parseInt(req.params.time)).then((location)=>{
        res.send(location)
    }).catch((error)=>{
        next(error)
    })
})
app.get('/getReports/',(req,res,next)=>{
    req.journey.getReports().then((reports)=>{
        res.send(reports)
    }).catch((error)=>{
        next(error)
    })
})

app.get('/report',(req,res,next)=>{
    req.journey.createReport(req.body.location,req.body.time);
})
module.exports = app;