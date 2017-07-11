//define the points class
class Point{
    constructor(point){
        //defined the classes properties
        this.pointID = point.pointID;
        this.pointNum = point.pointNum;
        this.start = point.start || false;
        this.stop = point.stop || false;
        this.end = point.end || false;
        this.routeID = point.routeID;
        this.location = point.location.coordinates;
    }
}
//export the points class
module.exports = Point;