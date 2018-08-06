var isOnline = require('is-online');
var log = require('./logger');

/*
	Since I host my app on my own computer I faced a problem; when there is no internet connection,
	my app doesn't stop queueing tweets so when internet is up everything is sent at the same time
	which may lead to my Twitter account being banned (spam). So, whenever my app loses connection,
	it triggers this file as a child process. This file just keeps rechecking for connection and when it
	successfully connects to the internet it returns to my main app.
*/

log('* Checking for internet connection...');

async function resurrect(){

	await isOnline().then(online => {

		if(online){

			log('    -> Connected to internet\r\n');
			process.exit();

		}
	});

}


resurrect();
setInterval(resurrect,1000*6);
