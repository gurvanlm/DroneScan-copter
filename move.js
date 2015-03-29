var fs = require('fs');
var client = require('./drone');
var debug = require('./debug');
var takeoffNland = require('./takeoffNland');

/*var normalize = function(point, scale) {
    var norm = Math.sqrt(point.x * point.x + point.y * point.y);
    if(norm != 0) { // as3 return 0,0 for a point of zero length
        point.x = scale * point.x / norm;
        point.y = scale * point.y / norm;
    }
};*/

/*var getPoints = function(total) {

    var pts = [];
    var rad = 0.5;
    var center = {
        x: .5,
        y: .5
    };

    for (var i = 0; i < total; i++) {
        var currentI = 360 / total * i;
        var a = currentI * Math.PI / 180;

        var p = {
            x: Math.cos(a),
            y: Math.sin(a)
        };

        normalize(p, rad);
        p.x = p.x + center.x;
        p.y = p.y + center.y;
        pts.push(p);
    }
    return pts;
};*/

var totalDuration = 1000;
var rayon = 1;
var power = 0.2;

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
                        //this.front(target.y * power);
                        //this.left(target.x * power);
                        //console.log('MOVE power', target.y * power, target.x * power, totalDuration * rayon);
                        console.log('GO', direction, power);
                        this[direction](power);
                    }

                    /*var j = 0;
                    for (var i = 0; i < localPicturesBySegment; i++) {
                        setTimeout(function() {
                            j++;
                            console.log('TAKE PHOTO', j);
                            pictureCB(j);
                        }, ((totalDuration * rayon) / localPicturesBySegment) * i);
                    }*/

                })

                .after(totalDuration * rayon, function() {
                    this.stop();
                    console.log('MOVE COMPLETE');
                    cb();
                    /*if(!takeoffNland.isStopped) {
                        *//*this.back(target.y * power * 2);
                         this.right(target.x * power * 2);*//*

                        this.right(target.z * power * 2);
                    }*/

                });

                /*.after(totalDuration * rayon / 4, function() {
                    this.stop();
                })*/

                /*.after(500, function() {
                    if(!takeoffNland.isStopped) {
                        console.log('clockwiseSpeed', clockwiseSpeed);
                        this.clockwise(clockwiseSpeed);
                    }
                })

                .after(clockwiseDuration / localTotalSegments, function() {
                    this.stop();
                    console.log('STOP');
                    *//*if(!takeoffNland.isStopped) {
                        this.counterClockwise(clockwiseSpeed * 2);
                    }*//*
                })*/

                /*.after(clockwiseDuration / (localTotalSegments * 4), function() {
                    this.stop();

                    setTimeout(function() {
                        completeCB();
                        console.log('MOVE COMPLETE');
                    }, waitDuration);
                });*/
        }

    }
};
