var arDrone = require('ar-drone');
var client = arDrone.createClient('192.168.1.1', 1000);

require('./move')(client);
