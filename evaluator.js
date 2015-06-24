/*
 * Expression evaluator
 * @module evaluator
 */
'use strict';

var vm = require('vm');

module.exports = {
	/** Evaluates an expression e.g 1+2= */
	evaluate: function (expression) {
		return vm.runInThisContext(expression);
	}
}

