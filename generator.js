'use strict';

var http = require('http');
var querystring = require('querystring');
var args = require('minimist')(process.argv.slice(2));
var DEFAULT_PORT = 3000;
var DEFAULT_DELAY = 1000;
var Logger = require('./utils/logger');
var logger = new Logger('logs/generator.log');

setInterval(getResult, args.delay || DEFAULT_DELAY);

function getResult () {
	var timer = this;
	var data = {
		expression: getRandomNumber() + '+' + getRandomNumber() + '='
	};
	var options = {
		hostname: '',
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
					logger.log('Received result of ' + body);
				});
		})
		.on('error', function (e) {
			clearInterval(timer);
			logger.log('Error: ', e.message);
		});
}

function getRandomNumber() {
	return Math.floor((Math.random() * 10) + 1);
}

