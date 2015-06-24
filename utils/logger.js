/**
 * Logs to file/console
 * @module logger
 */

'use strict';

var fs = require('fs');
var path = require('path');

/**
 * @constructor
 * @param {string} logFile
 */
function Logger (logFile) {
	var dir = path.dirname(logFile);
	fs.lstat(dir, function(err, stats) {
		if (err) {
			fs.mkdir(dir);
		}
	});
	/** Log file path and name */
	this.logFile = logFile;
};

/** Logs message to file/console */
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

/** Initializes and returns new Logger e.g. Logger('/logs/server.log') */
module.exports = function (logFile) {
	return new Logger(logFile);
};

