/* global module, require */

(function () {
    'use strict';

    var fr = 5;
    var arDrone = require('ar-drone'),

        client1 = arDrone.createClient({
            ip: '192.168.3.84',
            frameRate: fr
        }),
        client2 = arDrone.createClient({
            ip: '192.168.3.85',
            frameRate: fr
        }),
        client3 = arDrone.createClient({
            ip: '192.168.3.86',
            frameRate: fr
        });

    module.exports = [client1, client2, client3];

}());
