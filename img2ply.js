(function () {
    'use strict';

    var exec = require('child_process').exec,
        child;


    module.exports = {

        render3d : function(imgFolder, id, callback){

            child = exec('VisualSFM sfm+pmvsZ ' + imgFolder + ' D:\\exports\\'+id,
                function (error, stdout, stderr) {

                    callback();

                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
            })

        }


    }





}());
