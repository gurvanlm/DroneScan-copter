/* global console, require */

(function () {
    'use strict';



    console.log("START : " + new Date().toGMTString());

    var img2ply = require('./img2ply'),
        imgFolder = "D:\\nescafe\\photos",
        uuid = require("node-uuid"),
        skipRender = true,
        objectID = skipRender ? "7fbc313b56e" : uuid.v1().substring(25);

    img2ply.renderPLY(imgFolder, objectID, skipRender, function(){

        console.log("renderPLY finished");

        img2ply.generateWebPage(objectID, function(){


            console.log("generateWebPage finished");



            console.log("END : " + new Date().toGMTString());


        })

    });

}());
