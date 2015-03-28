/* global module, require */

(function () {
    'use strict';

    var arDrone = require('ar-drone'),
        client = arDrone.createClient({
            frameRate: 0.5
        });
        
    module.exports = client;

}());