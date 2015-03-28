(function () {
    'use strict';

    var exec = require('child_process').exec;
    var fs = require('fs');
    var child;
    var express = require('express')
    var app = express()


    app.use(express.static('D:\\fHacktory\\server'));

    var server = app.listen(3000, function () {

        var host = server.address().address
        var port = server.address().port

        console.log('Example app listening at http://%s:%s', host, port)

    });



    module.exports = {

        renderPLY : function(imgFolder, id, skipRender, callback){

            if(skipRender){
                callback();
                return;
            }

            var renderPlyCmd = 'VisualSFM sfm+pmvsZ ' + imgFolder + ' D:\\fHacktory\\exports\\' + id;

            console.log("Render ply cmd : " + renderPlyCmd);

            child = exec(renderPlyCmd,
                function (error, stdout, stderr) {



                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }else {
                        callback();
                    }

            })

        },

        generateWebPage : function(id, callback) {


            var cmd = 'PotreeConverter.exe --source D:\\fHacktory\\exports\\'+id+'.0.ply -o D:\\fHacktory\\server\\'+id+' -p -l 3';

            console.log("generate web page cmd : " + cmd);

            child = exec(cmd,

                {
                  cwd:"D:\\fHacktory\\photos2ply\\tools\\PotreeConverter"
                },

                function (error, stdout, stderr) {




                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }


                    var path = 'D:\\fHacktory\\server\\'+id+'\\examples\\' ;


                    fs.createReadStream('template\\index.html').pipe(fs.createWriteStream(path+ "index.html"));

                    fs.rename(path+ ""+ id+'.0.ply.js',path + "model.ply.js",callback);
                }


            );

        }



    }





}());
