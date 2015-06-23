'use strict';

var http = require('http');
var connect = require('connect');
var Evaluator = require('./evaluator');
var app = connect();
var querystring = require('querystring');
var sanitizer = require('sanitizer');
var args = require('minimist')(process.argv.slice(2));
var Logger = require('./utils/logger');
var logger = new Logger('logs/server.log');
var DEFAULT_PORT = 3000;


app.use('/evaluate', function (req, res) {
	try {
		var query = querystring.parse(req._parsedUrl.query);
		var expression = sanitizer.sanitize(query.expression.replace('=',''));
		var response = {
			result: Evaluator.evaluate(expression)
		};
		logger.log('Received expression: (' + query.expression + ') - Result:' + response.result);
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(response));
	} catch (e) {
		logger.log('Error: ' + e.message);
	}
});

http.createServer(app).listen(args.port || DEFAULT_PORT);

