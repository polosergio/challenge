'use strict';

var fs = require('fs');
var path = require('path');

function Logger (logFile) {
	var dir = path.dirname(logFile);
	fs.lstat(dir, function(err, stats) {
		if (err) {
			fs.mkdir(dir);
		}
	});
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

module.exports = function (logFile) {
	return new Logger(logFile);
};

