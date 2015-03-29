/* global console, module, require */

(function () {
    'use strict';

    var fs = require('fs'),
        now = new Date().getTime(),
        capturesFolder = 'captures',
        dir = './captures/capture-' + now + '/',
        client = require('./drone'),
        debug = require('./debug'),
        pngImage;

    module.exports = {
        init: function (drone, folder, callback) {

            if(debug) {

                callback();

            } else {
                var receivingPictures = false;

                if (!fs.existsSync(capturesFolder)) {
                    fs.mkdirSync(capturesFolder);
                }

                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder);
                }

                var pngStream = drone.getPngStream();

                pngStream
                    .on('error', console.log)
                    .on('data', function (pngBuffer) {
                        pngImage = pngBuffer;

                        if (!receivingPictures) {
                            receivingPictures = true;
                        }

                        var now =  new Date().getTime();
                        var fileName = dir + now + '.png';

                        fs.writeFile(fileName, pngImage);
                    });

                callback(drone, pngStream);
            }

        },
        getCaptureFolder: function() {
            return dir;
        },
        capture: function (segmentNumber, pictureNumber, callback) {
            var now =  new Date().getTime();
            var fileName = dir + now + '.png';

            if(debug) {
                callback();
            } else {
                fs.writeFile(fileName, pngImage, function (err) {
                    if (err) {
                        return callback(err);
                    }
                    return callback();
                });
            }
        }
    };


}());
