var keypress = require('keypress');
var drones = require('./drones');
var debug = require('./debug');

var service = {};

service.isStopped = false;

service.land = function(drone, cb) {
    if(debug) {
        cb();
    } else {
        drone.stop();
        drone.land(cb);
    }
};

service.takeoff = function(drone, cb) {
    service.isStopped = false;

    if(debug) {
        setTimeout(function() {
            cb(null);
        }, 50);
    } else {

        drone.config('general:navdata_demo', 'FALSE');

        drone.takeoff(function() {
            console.log('DONE takeoff');

            /*drone.on('navdata', function(navdata) {
             console.log('navdata.demo.altitudeMeters', navdata.demo.altitudeMeters);
             });*/

            cb(drone);
        });

    }
};

keypress(process.stdin);

process.stdin.on('keypress', function(ch, key) {

    if(key.name === 'space') {
        console.log('/// ALERT STOP ///');
        service.isStopped = true;

        for (var i = 0; i < drones.length; i++) {
            var drone = drones[i];

            drone.stop();
            drone.land();
        }

        setTimeout(function() {
            process.exit(0);
        }, 1000);
    }

    /*if(key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }*/
});

process.stdin.setRawMode(true);
process.stdin.resume();

module.exports = service;
