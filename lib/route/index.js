//load database
var r = require('_/db');
//load route class
const Route = require('./Route.js')
//define function to get route
module.exports.get = function (id){
    //load route from database
    return r.table('routes').get(id).then((route)=>new Route(route));
}