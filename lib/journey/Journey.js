//load depnencys
const Route = require('_/route/Route');
const Report = require('_/report')
//create the journey class
class Journey extends Route{
    constructor(journey){
        //define properties
        super(journey);
        this.journeyID = journey.journeyID;
        this.stops = journey.stops;
    }
    //define function createReport to create a report using report class
    createReport(location,time){
        return Report.create(this.journeyID,location,time)
    }
}
//export the journey class
module.exports = Journey