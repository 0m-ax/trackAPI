r = require('rethinkdb');
r.connect( {host: 'rethinkdb', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
    r.tableCreate('points',{primaryKey:'pointID'}).run(connection)
    .then(()=>r.table("points").indexCreate("routeID").run(conn))
    .then(()=>r.table('points').indexCreate('location', {geo:true}).run(connection))
    .then(()=>{
        var points = require('./data/points.json');
        for(i in points){
            var point = points[i];
            point.location = r.point(...point.location)
            points[i] = point;
        }
        return r.table('points').insert(points).run(connection)
    })
    .then(()=>r.tableCreate('routes',{primaryKey:'routeID'}).run(connection))
    .then(()=>r.table('routes').insert(require('./data/route.json')).run(connection))
    .then(()=>r.tableCreate('reports',{primaryKey:'reportID'}).run(connection))
    .then(()=>r.table("reports").indexCreate("journeyID").run(connection))
    .then(()=>r.table('reports').indexCreate('location', {geo:true}).run(connection))
    .then(()=>{
        var points = require('./data/reports.json');
        for(i in points){
            var point = points[i];
            point.location = r.point(...point.location)
            points[i] = point;
        }
        return r.table('reports').insert(points).run(connection)
    })
    .then(()=>r.tableCreate('journeys',{primaryKey:'journeyID'}).run(connection))
    .then(()=>r.table("journeys").indexCreate("routeID").run(connection))
    .then(()=>r.table('journeys').insert(require('./data/journeys.json')).run(connection))

    .then(()=>process.exit())
    .catch((error)=>{
        console.error(error)
        process.exit(0)
    })
})
