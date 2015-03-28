var fs = require('fs');


//client.takeoff();

/*client
 .after(5000, function() {
 this.clockwise(0.5);
 })
 .after(3000, function() {
 this.stop();
 this.land();
 });*/

module.exports = function(client) {

    client.getPngStream()
        .on('data', function(data) {
            var now = new Date().getTime();
            var fileName = './photos/' + now + '.png';

            fs.writeFile(fileName, data, function(err) {
                if(err) console.log(err);
                console.log(fileName + ' Saved');
            });
        });
};
