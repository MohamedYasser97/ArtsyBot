var fs = require('fs');

//A custom-made logger that writes to text files as well

const log=(data)=>{

	console.log(data);
	fs.appendFileSync(`./logs/log_${new Date().getMonth()+1}_${new Date().getFullYear()}.txt`,`${data}\r\n`);
};

module.exports=log;
