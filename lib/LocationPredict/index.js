var turf = require('turf');
module.exports = function(points,reports,time){
    console.time("locationPredict")
    var stopnum = null;
    //remove all ports that the bus could not of visited due to there departue time being in the fueture
    var stops = points.filter((point)=>point.stop && point.time <= time)
    var laststop = stops[stops.length-1];
    pastPoints = points.filter((point)=>point.pointNum <= laststop.pointNum);
    //check if reports exist
    if(reports.length > 0){
        //### compute the location of the bus based on reports
        //create a array of report locations with weights
        var reportLocations = reports.map((report)=>{
            return turf.point(report.location,{
                //weight the bus locations based on how long ago they where
                weight:1/(time-report.time+1)
            })
        }).filter((report)=>{
            return report.properties.weight > 0.0001
        })
        var reportCollection = turf.featureCollection(reportLocations)
        //calculate the weighted center of the reports
        var point = turf.weightedCentroid(reportCollection, 'weight')
        //clip the weighted center to the bus route
        var lastReportLocationEstimate = turf.pointOnLine(pointsToLine(pastPoints),point);
        var reportLocation =  lastReportLocationEstimate.geometry.coordinates;
        var allStops = points.filter((point)=>point.stop)
        var stopsBefore = allStops.filter((stop)=>stop.pointNum <= lastReportLocationEstimate.properties.index);
        var prestop = stopsBefore[stopsBefore.length-1];
        var stopsAfter = allStops.filter((stop)=>stop.pointNum > lastReportLocationEstimate.properties.index);
        stopsAfter.unshift(prestop);
        var sections = stopsAfter.slice(1)
        .map((stop,i)=>points.filter((point)=>point.pointNum <= stop.pointNum && point.pointNum >= stopsAfter[i].pointNum))
        var fromStartToEst = sections[0].filter((point)=>point.pointNum<= lastReportLocationEstimate.properties.index);
        if(fromStartToEst.length > 0){
            var dist = turf.lineDistance(pointsToLine(fromStartToEst))+lastReportLocationEstimate.properties.dist;
        }else{
            var dist = lastReportLocationEstimate.properties.dist;
        }
        //TODO compute the location of a bus based on reports then posable distance traveled since
        //NOTE could possibly be done using modefiyed turf along from turf
    }   
    //### compute the location of the bus based on time
    //check if bus may have completed the route
    if(points[points.length-1].time <= time){
        return points[points.length-1].location
    }
    //check if bus has not started the route
    if(points[0].time >= time){
        return points[0].location
    }
    //get a list of stops;
    var stops = pastPoints.filter((point)=>point.stop)
    //find the previuse and next stop
    var prestop = stops[stops.length-2];
    var nextstop = stops[stops.length-1];
    var pastPoints = pastPoints.filter((point)=>point.pointNum >= prestop.pointNum)
    //get precenate travled betwen stops
    var per = (time-prestop.time)/(nextstop.time - prestop.time)
    var line = pointsToLine(pastPoints);
    //calculate point along route based on esitmated distance traveled
    var timeLocation = turf.along(line,turf.lineDistance(line)*per).geometry.coordinates;
    console.timeEnd("locationPredict")
    return {
        timeLocation:timeLocation,
        reportLocation:reportLocation,
        lastReportTime:Math.max(...reports.map((report)=>report.time))
    }
}
function pointsToLine(points){
    return turf.lineString(points.map((point)=>point.location))
}
//TODO: move to own file or find in turf libary
turf.weightedCentroid = function (fc, weightField) {
  var features = fc.features, totalWeight = 0, len = features.length, xSum = 0, ySum = 0, coords;
  for (var i = 0; i < len; i++){
    coords = features[i].geometry.coordinates;
    xSum+= coords[0] * features[i].properties[weightField];
    ySum+= coords[1] * features[i].properties[weightField];
    totalWeight+= features[i].properties[weightField];
  }
  xSum = xSum / totalWeight;
  ySum = ySum / totalWeight;
  return turf.point([xSum, ySum]);

}