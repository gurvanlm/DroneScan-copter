/* global console, require */

(function() {
    'use strict';

    var fs = require('fs'),
        drones = require('./drones'),
        Drone = require('./Drone'),
        move = require('./move'),
        capture = require('./capture'),
        debug = require('./debug'),
        takeoffNland = require('./takeoffNland'),
        totalSegments = 4,
        picturesBySegment = 5;

    //script/install
    //script/connect "fHacktory" -p "fHacktory" -a 192.168.3.84 -d 192.168.1.1
    //script/connect "fHacktory" -p "fHacktory" -a 192.168.3.85 -d 192.168.1.1
    //script/connect "fHacktory" -p "fHacktory" -a 192.168.3.86 -d 192.168.1.1

    var takeoffOk = false;
    var captureReady = false;

    var startMoving = function() {
        if(takeoffOk && captureReady) {

            var currentSegment = 0;
            move.init(picturesBySegment, totalSegments);

            var goNext = function() {
                if(!takeoffNland.isStopped) {
                    move.gotoNextPosition(function(currentPicture) {

                        // CAPTURE CALLBACK
                        capture.capture(currentSegment, currentPicture, function() {

                        });

                    }, function() {

                        // COMPLETE MOVE CALLBACK
                        if(currentSegment === totalSegments - 1) {

                            takeoffNland.land(function() {
                                //process.exit(0);
                            });

                        } else {
                            currentSegment++;
                            goNext();
                        }
                    });
                }
            };

            goNext();
        }
    };


    var endTotal = 0;
    var tryTotal = 0;
    var direction = 'right';
    var end = function() {
        endTotal++;
        if(endTotal === drones.length) {

            endTotal = 0;
            tryTotal = 0;
            direction = direction === 'right' ? 'left' : 'right';

            console.log('MISSION SUCCESS !!!');
        }
    };

    var tryMission = function() {
        tryTotal++;

        if(tryTotal === drones.length) {

            for (var i = 0; i < drones.length; i++) {
                drones[i].startMoving(direction, function() {
                    end();
                });

            }

        }
    };

    var start = function() {

        var folder = './captures/capture-' + new Date().getTime() + '/';

        for (var i = 0; i < drones.length; i++) {

            drones[i].takeoff(function() {
                tryMission();
            });

            /*takeoffNland.takeoff(drones[i], function(drone) {

                capture.init(drone, folder, function() {
                    tryMission();
                });
            });*/

        }
    };

    start();

}());
