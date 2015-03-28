/* global console, module, require */

(function () {
    'use strict';

    var fs = require('fs');

    module.exports = function (client) {
        var pngStream = client.getPngStream(),
            photoIndex = 0;

        pngStream
            .on('error', console.log)
            .on('data', function (pngBuffer) {
                var fileName = '/tmp/test-' + photoIndex + '.png';
                photoIndex++;
                fs.writeFile(fileName, pngBuffer, function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    console.log('Saving photo ' + fileName);
                });
            });
    };


}());