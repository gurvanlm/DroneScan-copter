var arDrone = require('ar-drone');
var takeoffNland = require('./takeoffNland');
var move = require('./move');
var capture = require('./capture');

function Drone(id, ip) {
    var self = this;
    this.id = id;
    this.ip = ip;

    this.client = arDrone.createClient({
        ip       : ip,
        frameRate: 5
    });

    this.client.on('navdata', function(data) {
        self.demo = data.demo;
    });

    var showBattery = function() {
        if(self.demo) {
            console.log('BATTERY', self.id, self.demo.batteryPercentage);
        }
    };
    setInterval(showBattery, 5000);
    showBattery();
}

module.exports = Drone;

Drone.prototype = {
    takeoff: function(cb) {
        if(!takeoffNland.isStopped) {
            takeoffNland.takeoff(this.client, this.id, cb);
        }
    },

    startMoving: function(direction, cb) {
        var self = this;

        if(!takeoffNland.isStopped) {

            // START CAPTURE
            capture.start(this);

            move.gotoNextPosition(self.client, direction, function() {

                // STOP CAPTURE
                capture.stop(self);

                // COMPLETE MOVE CALLBACK
                takeoffNland.land(self.client, cb);
            });


        }

    }
};
