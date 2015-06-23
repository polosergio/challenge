'use strict';

var fs = require('fs');

function Logger (logFile) {
	this.logFile = logFile;
};

Logger.prototype.log = function (message) {
	var timestamp = new Date().toString();
	var entry = timestamp + ' - ' + message + '\n';
	console.log(entry);
	fs.appendFile(this.logFile, entry, function (error) {
		if (error) {
			return console.log(error);
		}
	});
}

module.exports = Logger;

