var mdns = require('mdns-js');
var amount = process.argv[2];
var service = Array() ;
var i;
var portfinder = require('portfinder');

console.log("Info: build " + amount + " device .");

portfinder.getPort(function (err, port) {
	for (i = 0 ; i<amount ;i++) {
		service[i] = mdns.createAdvertisement(mdns.tcp('_hitachi'), port, {
		  name:'HITACHI_test' + i,
		  txt:{
		    id:"f4:b8:5e:01:0b:e6",
		    vs:"255",
		    err:"0",
		    st:"0"
		  }
		});
		service[i].start();
	}
});

// read from stdin
process.stdin.resume();

// stop on Ctrl-C
process.on('SIGINT', function () {
	for (i = 0 ; i<amount ;i++) {
		service[i].stop();
	}

	// give deregistration a little time
	setTimeout(function onTimeout() {
    	process.exit();
	}, 1000);
});