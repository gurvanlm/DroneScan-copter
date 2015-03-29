var arDrone = require('ar-drone');
var takeoffNland = require('./takeoffNland');
var move = require('./move');

module.exports = function Drone(id, ip) {
    this.id = id;
    this.ip = ip;

    this.client = arDrone.createClient({
        ip       : ip,
        frameRate: 5
    });
};

Drone.prototype = {
    takeoff: function(cb) {
        if(!takeoffNland.isStopped) {
            takeoffNland.takeoff(this.client, cb);
        }
    },

    startMoving: function(direction, cb) {
        var self = this;

        // START CAPTURE

        if(!takeoffNland.isStopped) {
            move.gotoNextPosition(self.client, direction, function() {

                // STOP CAPTURE

                // COMPLETE MOVE CALLBACK
                takeoffNland.land(self.client, cb);
            });
        }

    }
};
