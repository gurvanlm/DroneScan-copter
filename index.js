/* global console, require */

(function () {
    'use strict';

    var fs = require('fs'),
        client = require('./drone'),
        capture = require('./capture')(client),
        move = require('./move'),
        total = 30;

    move(client, total, function(err, position) {
        console.log('TAKE PICTURE IN POSITION', position);
    });

}());
