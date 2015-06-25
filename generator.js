/**
 * Generates random expressions and sents request to get it evaluated
 * @module Generator
 */

'use strict';

var querystring = require('querystring');
var http = require('http');

module.exports = {
    /** Sends expression request to local service to get it solved */
    getResult: function (expression, options, callback) {
        var data = {
            expression: expression
        };
        var opts = options || {};
        var httpOpts = {
            port: opts.port,
            path: '/evaluate?' + querystring.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return http.get(httpOpts, function (res) {
            var body = '';
            res
            .on('data', function (chunk) {
                body += chunk;
            })
            .on('end', function () {
                var response = JSON.parse(body);
                if (typeof callback === 'function') { callback(response); };
            });
        });
    },

    /** Generates random expression with format (x+y=) */
    generateExpression: function () {
        return this.getRandomNumber() + '+' + this.getRandomNumber() + '=';
    },

    /** Returns random number between 1 and 10. */
    getRandomNumber: function () {
        return Math.floor((Math.random() * 100) + 1);
    }
}

