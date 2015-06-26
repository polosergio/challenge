'use strict';

var Log = require('../utils/logger.js');
var expect = require('expect.js');
var fs = require('fs');
var path = require('path');
var testLog = 'logs/test.log';
var randomLog = 'random/file.log';
var loggerOne = Log(testLog, {debug: false});
var loggerTwo = Log();

describe('Logging', function () {
    before(function () {
        fs.writeFile(testLog, '');
        loggerOne.write('hello');
    });
    after(function () {
        fs.rmdirSync(path.dirname(randomLog));
    });
    describe('Log instance', function () {
        it('should initialize with a log file path', function () {
            expect(loggerOne.logFile).to.equal('logs/test.log');
        });
        it('should default to general.log if no logfile is passed', function () {
            expect(loggerTwo.logFile).to.equal('logs/general.log');
        });
        it('should create directory if it does not exist', function () {
            var exists;
            var loggerThree;

            exists = fs.existsSync(path.dirname(randomLog));
            expect(exists).to.be(false);

            loggerThree = Log(randomLog);
            exists = fs.existsSync(path.dirname(randomLog));
            expect(exists).to.be(true);
        });
    });
    describe('Log - write function', function () {
        it('should log a message to the file specified', function () {
            var fileContents;
            fileContents = fs.readFileSync(testLog, {encoding: 'utf-8'});
            expect(fileContents).to.contain('hello');
        });
    });
});

