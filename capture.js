/* global console, module, require */

(function () {
    'use strict';

    var fs = require('fs'),
        client = require('./drone'),
        pngStream = client.getPngStream(),
        pngImage;

    pngStream
        .on('error', console.log)
        .on('data', function (pngBuffer) {
            var pngImage = pngBuffer;

        });

    module.exports = function (number) {
        var fileName = './photos/' + number + '.png';

        fs.writeFile(fileName, pngImage, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('Saving photo ' + fileName);
        });
    };


}());