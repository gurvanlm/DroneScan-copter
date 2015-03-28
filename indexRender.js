/* global console, require */

(function () {
    'use strict';

    var img2ply = require('./img2ply'),
        imgFolder = "D:\\nescafe\\photos";

    img2ply.render3d(imgFolder, "1111", function(){

        console.log("finished")

    });

}());
