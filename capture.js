/* global console, module, require */

(function () {
    'use strict';

    var fs = require('fs'),
        dir = './photos',
        client = require('./drone'),
        now = new Date().getTime(),
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
        capture: function (number, callback) {
            var fileName = dir + '/capture-' + now + '-'+ number + '.png';

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