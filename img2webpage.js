(function () {
    'use strict';

    var exec = require('child_process').exec;
    var fs = require('fs');
    var express = require('express');
    var convert = require('netpbm').convert;
    var uuid = require("node-uuid");

    var child;
    var app = express();

    var serverPath = 'D:\\fHacktory\\server';
    var exportsPath = 'D:\\fHacktory\\exports';

    var imgFolder = "D:\\nescafe\\photos2";
    var skipRender = false;
    var user = 'dupont';




    function render(imgFolder, id, user, projectName, skipRender, callback){

        if(skipRender){
            generateWebPage(imgFolder, id,  user, projectName, callback);
            return;
        }


        var renderPlyCmd = 'VisualSFM sfm+pmvs ' + imgFolder + ' ' + exportsPath + '\\' + id;

        console.log("Render ply cmd : " + renderPlyCmd);

        child = exec(renderPlyCmd,
            {maxBuffer: 1024 * 500},
            function (error, stdout, stderr) {

                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }else {
                    generateWebPage(imgFolder, id, user, projectName, callback);
                }

            })

    }



    function generateWebPage(imgFolder, id, user, projectName, callback) {


        var cmd = 'PotreeConverter.exe --source D:\\fHacktory\\exports\\'+id+'.0.ply -o '+serverPath+'\\'+id+' -p -l 3';

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


                var path = serverPath+'\\'+id+'\\examples\\' ;

                fs.createReadStream('item_template\\index.html').pipe(fs.createWriteStream(path+ "index.html"));

                fs.rename(path+ "\\"+ id+'.0.ply.js',path + "model.ply.js",callback);


                // create json descriptor file
                var descriptor = {
                    id: id,
                    user: user,
                    creationDate: new Date().toGMTString(),
                    name: projectName
                };

                fs.writeFile(serverPath+'\\'+id+'\\descriptor.json', JSON.stringify(descriptor));




                var files = fs.readdirSync(imgFolder);
                for (var index = 0; index < files.length; index++ ) {
                    var file = files[index];
                    if (file[0] !== '.') {
                        var filePath = imgFolder + '\\' + file;
                       if(filePath.substr(-3) == "jpg" || filePath.substr(-3) == "JPG"){
                           fs.createReadStream(filePath).pipe(fs.createWriteStream(serverPath+'\\'+id+'\\'+"preview.jpg"));

                       }
                    }
                }

            }

        );

    }



    app.use(express.static(serverPath));
    //app.use(express.static("./site"));

    app.get('/createProject', function(req, res){

        console.log("START : " + new Date().toGMTString());

        var objectID = skipRender ? "780b35e9a31" : uuid.v1();
        render(imgFolder, objectID, user, req.param("projectName"), skipRender, function(){
            console.log("END : " + new Date().toGMTString());
            res.send(objectID);
        } );
    });


    app.get('/listProjects', function (req, res) {


        var dirs = [];
        var files = fs.readdirSync(serverPath);

        for (var index = 0; index < files.length; index++ ) {
            var file = files[index];
            if (file[0] !== '.') {
                var filePath = serverPath + '\\' + file;
                var stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    dirs.push(file);
                }
                if (files.length === (index + 1)) {


                    var descriptors = [];


                    for(var folderIndex=0; folderIndex < dirs.length; folderIndex++ ){


                        var descriptorString = fs.readFileSync(serverPath + '\\' + dirs[folderIndex] + '\\descriptor.json', "utf8");

                        descriptors.push(JSON.parse(descriptorString));


                    }

                    res.send(JSON.stringify(descriptors));
                }
            }
        }
    });

    module.exports = {


        launchServer : function(){
            var server = app.listen(3000, function () {

                var host = server.address().address
                var port = server.address().port

                console.log('Server listening at http://%s:%s', host, port)

            });
        }



    }





}());
