/*
	This file is responsible for restarting the main bot file whenever it exits.
	The bot file can only exit when there is no internet connection or when
	an image upload or tweet sending fails.
*/

while(1){
	require('child_process').execSync('node bot.js',{stdio:[0,1,2]});
}
