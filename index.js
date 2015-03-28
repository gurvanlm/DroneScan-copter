/* global console, require */

(function () {
    'use strict';

    var fs = require('fs'),
        client = require('./drone'),
        move = require('./move'),
        capture = require('./capture'),
        total = 30;

    capture.init(function () {

        move(client, total, function (err, position) {
            capture.capture(position, function(err) {
                if(!err) {
                    console.log('Picture taken callback');
                }
            });
        });

    });

}());