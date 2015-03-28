/* global console, require */

(function () {
    'use strict';

    var fs = require('fs'),
        client = require('./drone'),
        capture = require('./capture')(client);

    require('./move')(client, function (position) {
        console.log('TAKE PICTURE IN POSITION', position);
    });

    //    client.createREPL();


}());