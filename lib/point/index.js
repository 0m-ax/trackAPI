var r = require('rethinkdbdash')({host: 'rethinkdb', port: 28015});
const Point = require('./Point.js')
module.exports.getByRoute = function(routeID,stops){
    console.log(routeID)
    return r.table("points").getAll(routeID, {index:"routeID"}).run()
    .then((points)=>LoadFromArray(points,stops))
}
var LoadFromArray = function (points,stops){
    return  points.map((point)=>new Point(point))
    .sort(function(a, b) {
        if (a.pointNum < b.pointNum){
            return -1;
        }else if(a.pointNum > b.pointNum){
            return 1;
        }else{
            return 0;
        }
    })
    .map((point)=>{
        if(stops && point.stop){
            point.time = stops.shift();
        }
        return point;
    });
}