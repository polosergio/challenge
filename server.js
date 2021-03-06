'use strict';

var http = require('http');
var connect = require('connect');
var evaluator = require('./evaluator');
var app = connect();
var querystring = require('querystring');
var sanitizer = require('sanitizer');
var args = require('minimist')(process.argv.slice(2));
var log = require('./utils/log')('logs/server.log');
var DEFAULT_PORT = 3000;


app.use('/evaluate', function (req, res) {
    try {
        var query = querystring.parse(req._parsedUrl.query);
        var response = {};
        var expression;

        if (!query.expression) {
            throw Error('expression argument is required');
        }

        expression = sanitizer.sanitize(query.expression);

        if (!evaluator.isValid(expression)) {
            throw Error('expression must follow format (x+y=)');
        }

        response.result = evaluator.evaluate(expression)
        log.write('Received expression: (' + query.expression + ') - Result:' + response.result);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    } catch (e) {
        res.statusCode = 400;
        log.write('Error: ' + e.message);
        res.end(JSON.stringify({error: e.message}));
    }
});

http.createServer(app).listen(args.port || DEFAULT_PORT);

