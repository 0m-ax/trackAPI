//load database
var r = require('_/db');
//load the journey class
var Journey = require('./Journey')
//export the function get to load the journey
module.exports.get = function (id){
    //retrive the journey from the database
     return r.table('journeys').get(id)
     .merge(function (journey){
        //join the journey to the routes table
        return r.table('routes').get(journey('routeID'))
     }).run()
     //return a new instance of the journey class
     .then((journey)=>new Journey(journey));
}