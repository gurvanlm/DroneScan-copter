var Drone = require('./DroneClass');

var drones = [
    new Drone(0, '192.168.3.84'),
    new Drone(1, '192.168.3.85'),
    new Drone(2, '192.168.3.86')
];

module.exports = function() {
    return drones;
};
