//define reports class
class Report {
    constructor(report){
        //define properties
        this.reportID = report.reportID;
        this.journeyID = report.journeyID;
        this.location = report.location.coordinates;
        this.time = parseInt(report.time);
    }
}
//export report class
module.exports = Report;
