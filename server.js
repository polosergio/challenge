'use strict';

var http = require('http');
var connect = require('connect');
var evaluator = require('./evaluator');
var app = connect();
var querystring = require('querystring');
var sanitizer = require('sanitizer');
var args = require('minimist')(process.argv.slice(2));
var logger = require('./utils/logger')('logs/server.log');
var DEFAULT_PORT = 3000;


app.use('/evaluate', function (req, res) {
    try {
        var query = querystring.parse(req._parsedUrl.query);
        var response = {};
        var expression;

        if (!query.expression) {
            res.statusCode = 400;
            throw Error('expression argument is required');
        }

        if (!/\d+\+\d+\=/.test(query.expression)) {
            res.statusCode = 400;
            throw Error('expression must follow format (x+y=)');
        }

        expression = sanitizer.sanitize(query.expression.replace(/=/g,''));
        response.result = evaluator.evaluate(expression)
        logger.log('Received expression: (' + query.expression + ') - Result:' + response.result);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    } catch (e) {
        logger.log('Error: ' + e.message);
        res.end(JSON.stringify({error: e.message}));
    }
});

http.createServer(app).listen(args.port || DEFAULT_PORT);

