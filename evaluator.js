'use strict';

var vm = require('vm');

module.exports = {
	evaluate: function (expression) {
		return vm.runInThisContext(expression);
	}
}

