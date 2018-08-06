while(1){
	require('child_process').execSync('node bot.js',{stdio:[0,1,2]});
}
