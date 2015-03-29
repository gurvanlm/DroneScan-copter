/* global console, module, require */

(function () {
    'use strict';

    var fs = require('fs'),
        capturesFolder = 'captures',
        debug = require('./debug');

    module.exports = {
        init: function (drone, folder, callback) {

            drone.pngStream = drone.client.getPngStream();

            if(debug) {

                callback();

            } else {

                if (!fs.existsSync(capturesFolder)) {
                    fs.mkdirSync(capturesFolder);
                }

                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder);
                }

                var started = false;

                drone.pngStream
                    .on('error', console.log)
                    .on('data', function (pngBuffer) {

                        if(!started) {
                            callback();
                        }

                        if(drone.takePicture) {
                            var now =  new Date().getTime();
                            var fileName = folder + drone.id + '-' + now + '.png';

                            fs.writeFile(fileName, pngBuffer);


                            started = true;
                        }

                    });

            }

        },

        start : function(drone) {
            drone.takePicture = true;
        },
        stop : function(drone) {
            drone.takePicture = false;
        }
    };


}());
