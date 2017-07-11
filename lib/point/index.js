//load database
var r = require('_/db');
//load Point class
const Point = require('./Point.js')
//define function to load array of points by there assisated journey
module.exports.getByRoute = function(routeID,stops){
    //query database for points assiated with route
    return r.table("points").getAll(routeID, {index:"routeID"}).run()
    //generate and array of Point instances from results
    .then((points)=>LoadFromArray(points,stops))
}
//define function to create array
var LoadFromArray = function (points,stops){
    //loop over array createing instances of point class
    return  points.map((point)=>new Point(point))
    //sort the array by there order on route
    .sort(function(a, b) {
        if (a.pointNum < b.pointNum){
            return -1;
        }else if(a.pointNum > b.pointNum){
            return 1;
        }else{
            return 0;
        }
    })
    //define times for the stops
    .map((point)=>{
        if(stops && point.stop){
            point.time = stops.shift();
        }
        return point;
    });
}