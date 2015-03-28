/* global module, require */

(function () {
    'use strict';

    var arDrone = require('ar-drone'),
        client = arDrone.createClient();
    
    module.exports = client;

}());