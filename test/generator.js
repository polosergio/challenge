'use strict';

var expect = require('expect.js');
var generator = require('../generator.js');
var PassThrough = require('stream').PassThrough;
var sinon = require('sinon');
var http = require('http');

describe('Generating expressions', function () {
    describe('Generator object', function () {
        it('should return an object', function () {
            expect(generator).to.be.a('object');
        });

        it('should contain generateExpression function', function () {
            expect(generator.generateExpression).to.be.a('function');
        });

        it('should contain getRandomNumber function', function () {
            expect(generator.getRandomNumber).to.be.a('function');
        });

        it('should contain getResult function', function () {
            expect(generator.getResult).to.be.a('function');
        });
    });

    describe('Generator function getRandomNumber', function () {
        it('should generate a random number between 1 and 100', function () {
            var number = generator.getRandomNumber();
            expect(number).to.be.a('number');
            expect(number).to.be.within(0, 100);
        });
    });

    describe('Generator function generateExpression', function () {
        it('should generate a random expression of format (x+y=)', function () {
            var expression = generator.generateExpression();
            expect(expression).to.be.a('string');
            expect(expression).to.match(/\d+\+\d+\=/);
        });
    });

    describe('Generator function getResult', function () {
        beforeEach(function () {
            this.request = sinon.stub(http, 'request');
        });

        afterEach(function () {
            http.request.restore();
        });

        it('should request the result for a given expression', function (done) {
            var expression = generator.generateExpression();
            var expected = {result: ''};
            var fakeResponse = new PassThrough();
            var request = new PassThrough();

            fakeResponse.write(JSON.stringify(expected));
            fakeResponse.end();
            this.request
                .callsArgWith(1, fakeResponse)
                .returns(request);

            generator.getResult(expression, {port: null}, function (response) {
                expect(response).to.eql(expected);
                done();
            });

        });
    });
});

