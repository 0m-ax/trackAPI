const Point = require('_/point');
const Report = require('_/report')
const LocationPredict = require('_/LocationPredict')
class Route{
    constructor(route){
        this.routeID = route.routeID;
        this.name = route.name;
    }
    getPoints(){
        return Point.getByRoute(this.routeID,this.stops);
    }
    predictLocation(time){
        var self = this;
        return Promise.all([self.getPoints(),self.getReports()])
        .then(([points, reports])=>LocationPredict(points, reports, time));
    }
    getReports(){
        return Report.getByJourney(this.journeyID)
    }
}
module.exports = Route;