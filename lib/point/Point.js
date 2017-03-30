class Point{
    constructor(point){
        this.pointID = point.pointID;
        this.pointNum = point.pointNum;
        this.start = point.start || false;
        this.stop = point.stop || false;
        this.end = point.end || false;
        this.routeID = point.routeID;
        this.location = point.location.coordinates;
    }
}
module.exports = Point;