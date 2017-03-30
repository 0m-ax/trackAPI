var points = require('./data/points')
num = 0;
for(i in points){
    var point = points[i];
    var output = {};
    if(point.properties.type == "stop"){
        output.stop = true
    }else{
        output.stop = false;
    }
    output.start = point.properties.start || false;
    output.end = point.properties.end || false;
    output.time = point.properties.time;
    output.pointNum = num++;
    output.location = point.geometry.coordinates
    output.routeID = 0;
    points[i] = output;
}
console.log(points)