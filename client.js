//Generates a random expression and sends it as a request to a specified service to get it solved every set interval
//Takes arguments --port and --delay e.g --port=3000 --delay=500 (ms)
'use strict';

var http = require('http');
var querystring = require('querystring');
var args = require('minimist')(process.argv.slice(2));
var DEFAULT_PORT = 3000;
var DEFAULT_DELAY = 1000;
var logger = require('./utils/logger')('logs/generator.log');

setInterval(getResult, args.delay || DEFAULT_DELAY);

/** Generates random expression and sends request to local service */
function getResult () {
    var timer = this;
    var data = {
        expression: getRandomNumber() + '+' + getRandomNumber() + '='
    };
    var options = {
        port: args.port || DEFAULT_PORT,
        path: '/evaluate?' + querystring.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    http
        .get(options, function (res) {
            var body = '';
            res
                .on('data', function (chunk) {
                    body += chunk;
                })
                .on('end', function () {
                    var response = JSON.parse(body);
                    logger.log('Received result of ' + response.result + ' for expression (' + data.expression + ')');
                });
        })
        .on('error', function (e) {
            clearInterval(timer);
            logger.log('Error: ', e.message);
        });
}

/** Returns random number. */
function getRandomNumber() {
    return Math.floor((Math.random() * 10) + 1);
}

