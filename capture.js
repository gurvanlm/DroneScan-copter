/* global console, module, require */

(function () {
    'use strict';

    var fs = require('fs'),
        dir = './photos/',
        client = require('./drone'),
        pngStream = client.getPngStream(),
        pngImage;


    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    pngStream
        .on('error', console.log)
        .on('data', function (pngBuffer) {
            var pngImage = pngBuffer;

        });

    module.exports = function (number) {
        var fileName = dir + number + '.png';

        fs.writeFile(fileName, pngImage, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('Saving photo ' + fileName);
        });
    };


}());