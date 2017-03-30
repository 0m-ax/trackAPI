var r = require('rethinkdbdash')({host: 'rethinkdb', port: 28015});
const Report = require('./Report')
module.exports.create = function (journeyID,location,time){
    return r.table("reports").insert({
        journeyID:journeyID,
        location:r.point(location),
        time:time
    }).run();
};
module.exports.getByJourney = function (journeyID){
    return r.table("reports").getAll(journeyID, {index:"journeyID"}).run()
    .then((reports)=>reports.map((report)=>new Report(report)))
}