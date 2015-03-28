/* global console, module, require */

(function () {
    'use strict';

    var fs = require('fs');

    module.exports = function (client) {
        var pngStream = client.getPngStream();

        pngStream
            .on('error', console.log)
            .on('data', function (pngBuffer) {
                var now = new Date().getTime(),
                    fileName = './photos/' + now + '.png';

                fs.writeFile(fileName, pngBuffer, function (err) {
                    if (err) {
                        return console.log(err);
                    }

                    console.log('Saving photo ' + fileName);
                });
            });
    };


}());