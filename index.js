/* global console, require */

(function() {
    'use strict';

    var drones = require('./drones')(),
        capture = require('./capture'),
        takeoffNland = require('./takeoffNland');

    takeoffNland.init(drones);

    // 52
    //script/install
    //script/connect "fHacktory" -p "fHacktory" -a 192.168.3.84 -d 192.168.1.1

    // 87
    //script/install
    //script/connect "fHacktory" -p "fHacktory" -a 192.168.3.85 -d 192.168.1.1

    //script/install
    //script/connect "fHacktory" -p "fHacktory" -a 192.168.3.86 -d 192.168.1.1

    var start = function(cb) {
        var folder = './captures/capture-' + new Date().getTime() + '/';

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
                cb(folder);
            }
        };

        var tryMission = function() {
            tryTotal++;

            console.log('tryTotal', tryTotal, '/', drones.length);
            if(tryTotal === drones.length) {

                console.log('START ALL MOVES');

                drones[0].startMoving(direction, function() {
                    end();
                });

                drones[1].startMoving(direction, function() {
                    end();
                });

                drones[2].startMoving(direction, function() {
                    end();
                });

            }
        };

        console.log('DRONES', drones.length);

        drones[0].takeoff(function() {
            console.log('END TEST', 0);

            capture.init(drones[0], folder, function() {
                tryMission();
            });
        });

        drones[1].takeoff(function() {
            console.log('END TEST', 1);

            capture.init(drones[1], folder, function() {
                tryMission();
            });
        });

        drones[2].takeoff(function() {
            console.log('END TEST', 2);

            capture.init(drones[2], folder, function() {
                tryMission();
            });
        });
    };

    module.exports = start;

    start(function(folder) {
        console.log('folder', folder);
    });

}());
