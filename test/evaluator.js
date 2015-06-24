'use strict';

var evaluator = require('../evaluator');
var expect = require('expect.js');

describe('Evaluating expressions', function () {
    describe('Evaluator', function () {
        it('should contain evaluate function', function () {
            expect(evaluator.evaluate).to.be.a('function');
        });

        it('should evaluate passed expressions', function () {
            var expression = '2+3=';
            expect(evaluator.evaluate(expression)).to.equal(5);
        });

        it('should throw an error if expression does not follow required format', function () {
            var expression = 'invalid';
            expect(evaluator.evaluate).withArgs(expression).to.throwError();
        })
    });
});

