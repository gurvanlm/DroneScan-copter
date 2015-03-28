/* global console, require */

(function () {
    'use strict';

    var img2ply = require('./img2ply'),
        imgFolder = "D:\\nescafe\\photos",
        objectID =  "1111";

    img2ply.renderPLY(imgFolder, objectID, true, function(){

        console.log("renderPLY finished");

        img2ply.generateWebPage(objectID, function(){


            console.log("generateWebPage finished");


        })

    });

}());
