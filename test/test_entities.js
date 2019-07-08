const chai = require('chai');
const expect = require('chai').expect;
const server = require('../bin/www');
const fs = require('fs');

const testId = 'depositpoint:02210001-0000';

chai.use(require('chai-http'));

describe('API endpoint /v1/entities', function () {

  it('should return all entities',function () {
    return chai.request(server)
      .get('/v1/entities')
      .set('Fiware-Service', 'waste4think')
      .set('Fiware-ServicePath', '/deusto/w4t/zamudio/test')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
      });
  });

  it('should return 428 response code when no Service header',function () {
    return chai.request(server)
      .get('/v1/entities')
      .set('Fiware-ServicePath', '/deusto/w4t/zamudio/test')
      .then((res) => {
        expect(res).to.have.status(428);
      });
  });

  it('should return 428 response code when no ServicePath header',function () {
    return chai.request(server)
      .get('/v1/entities')
      .set('Fiware-Service', 'waste4think')
      .then((res) => {
        expect(res).to.have.status(428);
      });
  });

});

describe('API endpoint /v1/entities/:entityId', function () {

  it('should return single entitiy',function () {
    return chai.request(server)
      .get(`/v1/entities/${testId}`)
      .set('Fiware-Service', 'waste4think')
      .set('Fiware-ServicePath', '/deusto/w4t/zamudio/test')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
      });
  });

  it('should return 428 response code when no Service header',function () {
    return chai.request(server)
      .get(`/v1/entities/${testId}`)
      .set('Fiware-ServicePath', '/deusto/w4t/zamudio/test')
      .then((res) => {
        expect(res).to.have.status(428);
      });
  });

  it('should return 428 response code when no ServicePath header',function () {
    return chai.request(server)
      .get(`/v1/entities/${testId}`)
      .set('Fiware-Service', 'waste4think')
      .then((res) => {
        expect(res).to.have.status(428);
      });
  });

});

describe('API endpoint POST /v1/entities/', function () {

  it(`should return status 200`,function () {
    return chai.request(server)
      .post('/v1/entities/')
      .field('userfile', fs.readFileSync('./test/test.csv', 'utf-8'))
      .attach('files', './test/test.csv', 'test.csv')
      .set('Fiware-Service', 'waste4think')
      .set('Fiware-ServicePath', '/deusto/w4t/zamudio/test')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

  it(`should return 428 response code when no Service header`,function () {
    return chai.request(server)
      .post('/v1/entities/')
      .field('userfile', fs.readFileSync('./test/test.csv', 'utf-8'))
      .attach('files', './test/test.csv', 'test.csv')
      .set('Fiware-ServicePath', '/deusto/w4t/zamudio/test')
      .then((res) => {
        expect(res).to.have.status(428);
      });
  });

  it(`should return 428 response code when no ServicePath header`,function () {
    return chai.request(server)
      .post('/v1/entities/')
      .field('userfile', fs.readFileSync('./test/test.csv', 'utf-8'))
      .attach('files', './test/test.csv', 'test.csv')
      .set('Fiware-Service', 'waste4think')
      .then((res) => {
        expect(res).to.have.status(428);
      });
  });

  it(`should return 400 response code when no file is provided`,function () {
    return chai.request(server)
      .post('/v1/entities/')
      .field('userfile', fs.readFileSync('./test/test.csv', 'utf-8'))
      .set('Fiware-Service', 'waste4think')
      .set('Fiware-ServicePath', '/deusto/w4t/zamudio/test')
      .then((res) => {
        expect(res).to.have.status(400);
      });
  });

  it(`should return status 400 when wrong file type is provided`,function () {
    return chai.request(server)
      .post('/v1/entities/')
      .field('userfile', fs.readFileSync('./test/wrongFormat.docx', 'utf-8'))
      .attach('files', './test/wrongFormat.docx', 'wrongFormat.docx')
      .set('Fiware-Service', 'waste4think')
      .set('Fiware-ServicePath', '/deusto/w4t/zamudio/test')
      .then((res) => {
        expect(res).to.have.status(400);
      });
  });

});
