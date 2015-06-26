'use strict';

var evaluator = require('../evaluator');
var expect = require('expect.js');

describe('Evaluating expressions', function () {
    describe('Evaluator', function () {
        it('should contain evaluate function', function () {
            expect(evaluator.evaluate).to.be.a('function');
        });

        it('should contain isValid function', function () {
            expect(evaluator.isValid).to.be.a('function');
        });
    });

    describe('Evaluator - isValid function', function () {
        it('should return false if expression does not follow required format', function () {
            var expression = 'invalid';
            expect(evaluator.isValid(expression)).to.be(false);
        });

        it('should return true if expression follows required format', function () {
            var expression = '2+3=';
            expect(evaluator.isValid(expression)).to.be(true);
        });
    });

    describe('Evaluator - evaluate function', function () {
        it('should evaluate passed expressions', function () {
            var expression = '2+3=';
            expect(evaluator.evaluate(expression)).to.equal(5);
        });
    });
});

