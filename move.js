var fs = require('fs');

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


var getPoints = function() {

    /*var pts = [];
    var rad = 0.5;
    var center = {
        x: .5,
        y: .5
    };

    for (var i = 0; i <= 36; i++) {
        var a = i * 10 * Math.PI / 180;
        var p = new L.Point(Math.cos(a), Math.sin(a));
        this.normalize(p, rad);
        p = p._add({x: center.x, y: center.y});
        pts.push(p);
    }


    normalize: function(point, scale) {
        var norm = Math.sqrt(point.x * point.x + point.y * point.y);
        if(norm != 0) { // as3 return 0,0 for a point of zero length
            point.x = scale * point.x / norm;
            point.y = scale * point.y / norm;
        }
    }*/

};

module.exports = function(client, total, cb) {
    var position = 0;

    //client.takeoff();

    // take first picture
    var move = function() {
        cb(null, position);

        setTimeout(function() {
            position++;
            if(position < total) {
                move();
            }
        }, 1000);
    };

    move();
};
