/**
 * Logs to file/console
 * @module log
 */

'use strict';

var fs = require('fs');
var path = require('path');

/**
 * @constructor
 * @param {string} logFile
 * @param {object} options
 */
function Log (logFile, options) {

    if (!logFile) {
        logFile = 'logs/general.log';
    }

    var dir = path.dirname(logFile);
    var exists = fs.existsSync(dir);
    var default_options = {
        debug: true
    };

    if (!exists) {
        fs.mkdirSync(dir);
    }

    /** Log file path and name */
    this.logFile = logFile;

    this.options = options || default_options;
};

/** Logs message to file/console */
Log.prototype.write = function (message) {
    var timestamp = new Date().toString();
    var entry = timestamp + ' - ' + message + '\n';

    if (this.options.debug) {
        console.log(entry);
    }

    fs.appendFile(this.logFile, entry, function (error) {
        if (error) {
            return console.log(error);
        }
    });
}

/** Initializes and returns new Logger e.g. Logger('/logs/server.log') */
module.exports = function (logFile, options) {
    return new Log(logFile, options);
};

