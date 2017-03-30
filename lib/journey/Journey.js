const Route = require('_/route/Route');
const Report = require('_/report')
class Journey extends Route{
    constructor(journey){
        super(journey);
        this.journeyID = journey.journeyID;
        this.stops = journey.stops;
    }
    createReport(location,time){
        return Report.create(this.journeyID,location,time)
    }
}
module.exports = Journey