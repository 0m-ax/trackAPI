var r = require('rethinkdbdash')({host: 'rethinkdb', port: 28015});
var Route = require('_/route/Route.js');
class Journey extends Route{
    constructor(journey){
        super(journey);
        this.journeyID = journey.journeyID;
        this.stops = journey.stops;
    }
}
module.exports.get = function (id){
     return r.table('journeys').get(id)
     .merge(function (journey){
        return r.table('routes').get(journey('routeID'))
     }).run()
     .then((journey)=>new Journey(journey));
}