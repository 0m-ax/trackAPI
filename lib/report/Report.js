class Report {
    constructor(report){
        this.reportID = report.reportID;
        this.journeyID = report.journeyID;
        this.location = report.location.coordinates;
        this.time = parseInt(report.time);
    }
}
module.exports = Report;
