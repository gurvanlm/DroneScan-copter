var fs = require('fs');
var client = require('./drone');
var takeoffNland = require('./takeoffNland');

/*client
 .after(5000, function() {
 this.clockwise(0.5);
 })
 .after(3000, function() {
 this.stop();
 this.land();
 });*/


/*client.getPngStream()
 .on('data', function(data) {
 var now = new Date().getTime();
 var fileName = './photos/' + now + '.png';

 fs.writeFile(fileName, data, function(err) {
 if(err) console.log(err);
 console.log(fileName + ' Saved');
 });
 });*/

var normalize = function(point, scale) {
    var norm = Math.sqrt(point.x * point.x + point.y * point.y);
    if(norm != 0) { // as3 return 0,0 for a point of zero length
        point.x = scale * point.x / norm;
        point.y = scale * point.y / norm;
    }
};

var getPoints = function(total) {

    var pts = [];
    var rad = 0.5;
    var center = {
        x: .5,
        y: .5
    };

    for (var i = 0; i <= 360; i++) {
        var a = i * Math.PI / 180;

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
};

var totalPhoto;
var positions;

module.exports = {
    init: function(total) {
        totalPhoto = total;

        //positions = getPoints();
    },

    gotoPosition: function(position, cb) {
        console.log('GOTO POSITION', position);

        setTimeout(function() {
            cb();
        }, 300);

    }
};


/*function(total, cb) {
    var position = 0;

    var points = getPoints();

    //console.log('points', points);

    // take first picture
    var move = function() {

        if(takeoffNland.isStopped) {
            cb('ALERT STOPPED');

        } else {
            console.log('ICI', position);
            cb(null, position);

            setTimeout(function() {
                position++;
                if(position < total) {
                    move();
                }
            }, 300);
        }
    };

    move();
};*/
