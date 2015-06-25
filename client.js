//Takes arguments --port and --delay e.g --port=3000 --delay=500 (ms)
'use strict';

var args = require('minimist')(process.argv.slice(2));
var generator = require('./generator.js');
var logger = require('./utils/logger')('logs/generator.log');
var DEFAULT_DELAY = 1000;
var DEFAULT_PORT = 3000;

setInterval(function () {
    var timer = this;
    var expression = generator.generateExpression();
    generator
        .getResult(expression, {port: args.port || DEFAULT_PORT}, function (response) {
            logger.log('Received result of ' + response.result + ' for expression (' + expression + ')');
        })
        .on('error', function (e) {
            clearInterval(timer);
            logger.log('Error: ', e.message);
        });
}, args.delay || DEFAULT_DELAY);

