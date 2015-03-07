'use strict';

process.env.MONGO_URI = 'mongodb://localhost/blog_test';
require('../../server.js');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect;

describe('POST - Blog App test ', function() {
 after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('POST - record value', function(done) {
    chai.request('localhost:3000/api/v1')
      .post('/blogs')
      .send({blog_id: 1, title: 'test blog', author: 'test author', comments:['Great','Cool']})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.blog_id).to.eql(1);
        expect(res.body.title).to.eql('test blog');
        expect(res.body.author).to.eql('test author');
        done();
      });
  });

  it('POST - default value', function(done) {
    chai.request('localhost:3000/api/v1')
      .post('/blogs')
      .send({blog_id:2,title: 'another test'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.author).to.eql('Anonymous');
        done();
      });
  });

 
  describe('PUT & GET Test', function() {
    var id;
    beforeEach(function(done){
      chai.request('localhost:3000/api/v1')
        .post('/blogs')
        .send({blog_id:3, title: 'test- 33333'})
        .end(function(err, res) {
          id = res.body._id; 
          done();
        });
    });

    it('GET Test- test property', function(done) {
      chai.request('localhost:3000/api/v1')
        .get('/blogs')
        .end(function(err, res){
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.be.true; // jshint ignore:line
          expect(res.body[0]).to.have.property('title');
          done();
        });
    });

    it('PUT test ', function(done) {
      chai.request('localhost:3000/api/v1')
        .put('/blogs/' + 3)
        .send({title: 'new test body'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.title).to.eql('new test body');
          done();
        });
    });


  });
});


describe('DELETE Test', function() {
    var id;
    beforeEach(function(done){
      chai.request('localhost:3000/api/v1')
        .post('/blogs')
        .send({blog_id:4, title: 'test- 33333'})
        .end(function(err, res) {
          id = res.body._id; 
          done();
        });
    });

 it('DELETE test ', function(done) {
      chai.request('localhost:3000/api/v1')
        .delete('/blogs/' + 4)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.title).to.be.undefined;  // jshint ignore:line
          expect(res.body.author).to.be.undefined; // jshint ignore:line
          done();
        });
    });
  });
