var get=require('./getter');
var sub=require('./subreddits');
var fs = require('fs');

//This module helps in giving insight on a certain subreddit if you want to assess what ratio of this subreddit's posts will be duplicated

const analyze = async (tests)=>{

	console.log(`* Analysis information: \n    -> Number of tests: ${tests}\n    -> Date: ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()},${new Date().toLocaleString('en-GB',{timezone: 'Africa/Cairo',hour12: true}).split(',').pop()}\n----------------------------------------------------------------------------------------------------------------------------`);
	fs.appendFileSync(`./analytics/analysis_${new Date().getFullYear()}.txt`,`* Analysis information: \r\n    -> Number of tests: ${tests}\r\n    -> Date: ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()},${new Date().toLocaleString('en-GB',{timezone: 'Africa/Cairo',hour12: true}).split(',').pop()}\r\n----------------------------------------------------------------------------------------------------------------------------\r\n`);


	var i=0,dup=0;
	var arr=[];

	while(tests--){

		var subreddit= await sub.randomSubreddit();
		var res= await get(subreddit);
		if(res==='-1'){
			++tests;
			continue;
		}
		if(arr.indexOf(res) >-1){
			console.log(++i+') duplicate	same as ('+(arr.indexOf(res)+1)+')    '+ (++dup)+' duplicate'+(dup==1 ? '':'s')+' out of '+i+'		'+subreddit);
			fs.appendFileSync(`./analytics/analysis_${new Date().getFullYear()}.txt`,i+') unique	          '+ (dup)+'     duplicate'+(dup==1 ? '':'s')+' out of '+i+'		'+subreddit+'\r\n');

		}else{
			console.log(++i+') unique	              '+ (dup)+' duplicates out of '+i+'		'+subreddit);
			fs.appendFileSync(`./analytics/analysis_${new Date().getFullYear()}.txt`,i+') unique	          '+ (dup)+'     duplicates out of '+i+'		'+subreddit+'\r\n');
			arr.push(res);
		}
	}

	console.log('----------------------------------------------------------------------------------------------------------------------------');
	fs.appendFileSync(`./analytics/analysis_${new Date().getFullYear()}.txt`,'----------------------------------------------------------------------------------------------------------------------------\r\n');
}

module.exports=analyze;