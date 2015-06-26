/*
 * Expression evaluator
 * @module evaluator
 */
'use strict';

var vm = require('vm');

module.exports = {
    /** Validates if expression follows format of x+y= */
    isValid: function (expression) {
        return /^\d+\+\d+\=$/.test(expression);
    },
    /** Evaluates an expression e.g 1+2= */
    evaluate: function (expression) {
        return vm.runInThisContext(expression.replace(/=/g, ''));
    }
}

