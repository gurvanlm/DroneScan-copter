(function() {
    var keypress = require('keypress');
    var debug = require('./debug');
    var drones;

    var service = {};

    service.isStopped = false;

    service.init = function(newDrones) {
        drones = newDrones;
    };

    service.land = function(client, cb) {
        if(debug) {
            cb();
        } else {
            client.stop();
            client.land(cb);
        }
    };

    service.takeoff = function(client, id, cb) {
        service.isStopped = false;

        if(debug) {
            setTimeout(function() {
                cb(null);
            }, 50);
        } else {

            client.config('general:navdata_demo', 'FALSE');

            console.log('TAKEOFF', id);

            client.takeoff(function() {
                console.log('DONE takeoff', id);

                client.after(5000, function() {
                    console.log('Calibrating', id);
                    client.calibrate(0);
                    client.after(3000, function() {
                        console.log('DONE calibrating', id);
                        cb();
                    });
                });
            });

        }
    };

    keypress(process.stdin);

    var alertStop = function(drone) {
        drone.client.stop();
        drone.client.land();
    };

    process.stdin.on('keypress', function(ch, key) {

        var stop = function() {
            alertStop(drones[0]);
            alertStop(drones[1]);
            alertStop(drones[2]);

            setTimeout(function() {
                process.exit(0);
            }, 2000);
        };

        if(key.name === 'space') {
            service.isStopped = true;

            console.log('/// ALERT STOP ///');

            stop();
        }

        if(key && key.ctrl && key.name == 'c') {
            stop();
        }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();

    module.exports = service;

})();
