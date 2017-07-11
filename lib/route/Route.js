//load point class
const Point = require('_/point');
//load report class
const Report = require('_/report')
//load location Predict class
const LocationPredict = require('_/LocationPredict')
//define report class
class Route{
    constructor(route){
        //defiine properties
        this.routeID = route.routeID;
        this.name = route.name;
    }
    //define function to load points on route
    getPoints(){
        return Point.getByRoute(this.routeID,this.stops);
    }
    //define function to predict location
    predictLocation(time){
        var self = this;
        //get all points and reports
        return Promise.all([self.getPoints(),self.getReports()])
        //pass to location predict
        .then(([points, reports])=>LocationPredict(points, reports, time));
    }
    //define function to get a list of reports
    getReports(){
        return Report.getByJourney(this.journeyID)
    }
}
module.exports = Route;