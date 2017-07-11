process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
//Our parent block
describe('journey', () => {
  /*
  * Test the /GET route
  */
  describe('/GET journey/0', () => {
      it('it should GET the details about the journey', (done) => {
        chai.request(require('../'))
            .get('/journey/0')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body['routeID'].should.be.eql(0);
                res.body['stops'].should.be.a('array');
                res.body['journeyID'].should.be.eql(0);
                res.body['name'].should.be.a("string");
              done();
            });
      })
    })
  describe('/GET journey/0/getPoints', () => {
      it('it should GET the points assiated with a journey', (done) => {
        chai.request(require('../'))
            .get('/journey/0/getPoints')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              done();
            });
      }) 
    })
  describe('/GET journey/0/predictLocation/20', () => {
      it('it should GET a prediction for a particular journey', (done) => {
        chai.request(require('../'))
            .get('/journey/0/predictLocation/20')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body['timeLocation'].should.be.a('array');
                res.body['reportLocation'].should.be.a('array');
                res.body['lastReportTime'].should.be.a('number')
              done();
            });
      })
    })
  describe('/GET journey/0/getReports', () => {
      it('it should GET an array of reports', (done) => {
        chai.request(require('../'))
            .get('/journey/0/getReports')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0]['reportID'].should.be.a('string');
                res.body[0]['journeyID'].should.be.a('number');
                res.body[0]['time'].should.be.a('number');
                res.body[0]['location'].should.be.a('array');
              done();
            });
      })
    })
})
