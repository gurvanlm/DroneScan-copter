/* global module, require */

(function () {
    'use strict';

    var arDrone = require('ar-drone'),

        client1 = arDrone.createClient({
            ip: '192.168.3.84',
            frameRate: 5
        }),
        client2 = arDrone.createClient({
            ip: '192.168.3.85',
            frameRate: 5
        })/*,
        client3 = arDrone.createClient({
            ip: '192.168.3.86',
            frameRate: 5
        })*/;

    module.exports = [client1, client2];

}());
