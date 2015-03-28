var keypress = require('keypress');
var client = require('./drone');

var service = {};

service.isStopped = false;

service.land = function(cb) {
    client.stop();
    client.land(cb);
};

service.takeoff = function(cb) {
    //client.takeoff();
    service.isStopped = false;

    setTimeout(function() {
        cb(null);
    }, 500);
};

keypress(process.stdin);

process.stdin.on('keypress', function(ch, key) {

    if(key.name === 'space') {
        console.log('/// ALERT STOP ///');
        service.isStopped = true;
        client.stop();
        client.land();
    }

    if(key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();

module.exports = service;
