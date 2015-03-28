/* global module, require */

(function () {
    'use strict';

    var arDrone = require('ar-drone'),
        client = arDrone.createClient('192.168.1.1', 1000);
        
    module.exports = client;

}());