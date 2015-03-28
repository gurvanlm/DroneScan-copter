/* global console, module, require */

(function () {
    'use strict';

    var fs = require('fs'),
        now = new Date().getTime(),
        dir = './capture-' + now + '/',
        client = require('./drone'),
        pngStream = client.getPngStream(),
        pngImage;

    module.exports = {
        init: function (callback) {
            var receivingPictures = false;

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            pngStream
                .on('error', console.log)
                .on('data', function (pngBuffer) {
                    pngImage = pngBuffer;
                    if (!receivingPictures) {
                        console.log('STARTING TO RECEIVE PICTURES...');
                        receivingPictures = true;
                        callback();
                    }
                });
        },
        getCatureFolder: function() {
            return dir;
        },
        capture: function (number, callback) {
            var fileName = dir + number + '.png';

            fs.writeFile(fileName, pngImage, function (err) {
                if (err) {
                     console.log(err);
                    return callback(err);
                }
                console.log('Saving picture ' + fileName);
                return callback();
            });
        }
    };


}());