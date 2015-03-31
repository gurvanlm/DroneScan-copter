(function () {
    'use strict';

    var exec = require('child_process').exec;
    var fs = require('fs');
    var express = require('express');
    var convert = require('netpbm').convert;
    var gm = require('gm');
    var index = require('./index');

    var uuid = require("node-uuid");

    var child;
    var app = express();

    var serverPath = '.\\site';
    var exportsPath = 'D:\\fHacktory\\exports';

    var imgFolder = "D:\\fHacktory\\DroneScan-copter\\photos\\fruits";

    var skipRender = false;

    var user = 'dupont';




    function pngToJpg(folder, callback){

        var imgFolder = folder;
        var files = fs.readdirSync(imgFolder);

        var pngFiles = [];
        var countPng = 0;

        for (var index = 0; index < files.length; index++ ) {
            var file = files[index];
            if (file[0] !== '.') {
                var filePath = imgFolder + '\\' + file;
                if(filePath.substr(-3) == "png" || filePath.substr(-3) == "png"){


                   // filePath = "..\\..\\test\\"+file;
                    pngFiles.push(filePath);

                }
            }
        }


        function tryCallBack(){
            if(countPng == pngFiles.length){
                callback();
            }
        }

        for(var pngIndex=0; pngIndex <pngFiles.length; pngIndex++){

            var pngFilePath = pngFiles[pngIndex];

            var s = pngFilePath.replace("png","jpg");
            gm(pngFilePath).write(s, function(err){

                if (err) {
                    console.log(err);
                }

                countPng++;
                tryCallBack();

            });
        }






    }




    function render(imgFolder, id, user, projectName, skipRender, callback){

        if(skipRender){
            generateWebPage(imgFolder, id,  user, projectName, callback);
            return;
        }

        pngToJpg(imgFolder, function(){
            var renderPlyCmd = 'VisualSFM sfm+pmvs ' + imgFolder + ' ' + exportsPath + '\\' + id;

            console.log("Render ply cmd : " + renderPlyCmd);

            child = exec(renderPlyCmd,
                {maxBuffer: 10024 * 500},
                function (error, stdout, stderr) {

                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }else {
                        generateWebPage(imgFolder, id, user, projectName, callback);
                    }

                })
        });



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

                fs.mkdirSync(serverPath+'\\'+id+'\\photos');

                var photosPath = [];

                var files = fs.readdirSync(imgFolder);
                var previewDone = false;
                for (var index = 0; index < files.length; index++ ) {
                    var file = files[index];
                    if (file[0] !== '.') {
                        var filePath = imgFolder + '\\' + file;
                        if(filePath.substr(-3) == "jpg" || filePath.substr(-3) == "JPG"){
                            fs.createReadStream(filePath).pipe(fs.createWriteStream(serverPath+'\\'+id+'\\photos\\'+file));
                            photosPath.push(file);
                            if(!previewDone){

                                fs.createReadStream(filePath).pipe(fs.createWriteStream(serverPath+'\\'+id+'\\preview.jpg'));
                                previewDone = true;
                            }
                        }
                    }
                }


                // create json descriptor file
                var descriptor = {
                    id: id,
                    user: user,
                    creationDate: new Date().toGMTString(),
                    name: projectName,
                    photos : JSON.stringify(photosPath)
                };

                fs.writeFile(serverPath+'\\'+id+'\\descriptor.json', JSON.stringify(descriptor));

            }

        );

    }


    app.use(express.static("./site"));

    app.get('/createProject', function(req, res){

        console.log("START : " + new Date().toGMTString());

        var objectID = skipRender ? "95fc4f60-d5f2-11e4-b032-75d4217b9eba" : uuid.v1();


        // index(function(imageFolder){
            // render(imageFolder, objectID, user, req.param("projectName"), skipRender, function(){
                // console.log("END : " + new Date().toGMTString());
                // res.send(objectID);
            // } );
        // });
        //render("D:\\fHacktory\\DroneScan-copter\\captures\\capture-1427630602550", "98dbe650-d60b-11e4-b129-cb683a8358b2", user, req.param("projectName"), skipRender, function(){
        //            console.log("END : " + new Date().toGMTString());
        //            res.send(objectID);
        //        } );

		res.send(objectID);
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
        },

        pngToJpg : function(callback){
            pngToJpg("D:\\test", callback);
        }



    }





}());
