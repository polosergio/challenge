/*
 * Expression evaluator
 * @module evaluator
 */
'use strict';

var vm = require('vm');

module.exports = {
    /** Evaluates an expression e.g 1+2= */
    evaluate: function (expression) {
        if (!/\d+\+\d+\=/.test(expression)) {
            throw Error('expression must follow format (x+y=)');
        }
        return vm.runInThisContext(expression.replace(/=/g, ''));
    }
}

