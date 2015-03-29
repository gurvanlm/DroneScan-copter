var fs = require('fs');
//var client = require('./drone');
var debug = require('./debug');
var takeoffNland = require('./takeoffNland');

var totalDuration = 3000;
var rayon = 1;
var power = 0.05;

module.exports = {
    gotoNextPosition: function(client, direction, cb) {

        if(debug) {
            setTimeout(function() {
                cb();
            }, 50);
        } else {

            client
                .after(0, function() {
                    if(!takeoffNland.isStopped) {
                        console.log('GO', direction, power);
                        this[direction](power);
                    }
                })

                .after(totalDuration * rayon, function() {
                    this.stop();
                })

                .after(2000, function() {
                    console.log('MOVE COMPLETE');
                    cb();

                });

        }

    }
};
