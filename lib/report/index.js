//load database
var r = require('_/db');
//load Report class
const Report = require('./Report')
//define function to create new reports
module.exports.create = function (journeyID,location,time){
    //insert report into database
    return r.table("reports").insert({
        journeyID:journeyID,
        location:r.point(location),
        time:time
    }).run();
};
//define and export function to list reports by journey
module.exports.getByJourney = function (journeyID){
    //retrive reports from database
    return r.table("reports").getAll(journeyID, {index:"journeyID"}).run()
    //turn into array of report instances
    .then((reports)=>reports.map((report)=>new Report(report)))
}