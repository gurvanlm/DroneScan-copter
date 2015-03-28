/* global console, require */

(function () {
    'use strict';

    var fs = require('fs'),
        client = require('./drone'),
        move = require('./move'),
        capture = require('./capture'),
        takeoffNland = require('./takeoffNland'),
        totalPhoto = 8;

    var takeoffOk = false;
    var captureReady = false;

    var startMoving = function() {

        if(takeoffOk && captureReady) {
            console.log('FULL READY');

            var currentPosition = 0;
            move.init(totalPhoto);

            var goNext = function() {
                if(!takeoffNland.isStopped) {
                    move.gotoPosition(currentPosition, function() {

                        capture.capture(currentPosition, function() {

                            if(currentPosition === totalPhoto - 1) {
                                console.log('LAND');

                                takeoffNland.land(function() {
                                    console.log('COMPLETE');
                                    process.exit(0);
                                });

                            } else {
                                currentPosition++;
                                goNext();
                            }
                        });
                    });
                }
            };

            goNext();

            /*move(totalPhoto, function (err, position) {
                console.log('MOVED TO POSITION', position);

                capture.capture(position, function(err) {

                    if(position === totalPhoto - 1) {

                        takeoffNland.land(function() {
                            console.log('COMPLETE');
                            process.exit(0);
                        });
                    }
                });
            });*/
        }
    };

    takeoffNland.takeoff(function() {
        console.log('TAKEN OFF');
        takeoffOk = true;
        startMoving();
    });

    capture.init(function () {
        console.log('CAPTURE READY');
        captureReady = true;
        startMoving();
    });

}());
