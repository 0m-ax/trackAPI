var r = require('rethinkdbdash')({host: 'rethinkdb', port: 28015});
const Route = require('./Route.js')
module.exports.get = function (id){
    return r.table('routes').get(id).then((route)=>new Route(route));
}