var table = require('./serializer');
var downloader = require('image-downloader');
var fs = require('fs');
var isOnline = require('is-online');
var subreddit = require('./subreddits');
var URLgetter = require('./getter');
var log = require('./logger');

var checkConnectionInterval;

module.exports={

	//downloads a random image and returns its URL
	getImage : async function(){

		//keeps checking for internet connection every 6 seconds (timeout is 5 seconds)
		this.checkConnection();
		checkConnectionInterval = setInterval(this.checkConnection,1000*6);

		//selecting randomly which subreddit to post from
		var selectedSubreddit = await subreddit.randomSubreddit();
		log('* New image was selected from /r/' + selectedSubreddit + '\r\n* Fetching image...');

		var imageURL;

		//getting the image URL to download later
		imageURL = await URLgetter(selectedSubreddit);

		//only accepts URLs that contain png/jpg files and are not posted before (checked in my hash table)
		while(imageURL==='-1' || table.exists(imageURL))
			imageURL = await URLgetter(selectedSubreddit);
		
		
		log('    -> Image successfully fetched!' + `\r\n* Image URL: ${imageURL}` + '\r\n* Downloading Image...');
	
		//setting download options by specifying URL and destination
		const downloadOptions = {

			url: imageURL,
  			dest: `./images/x.jpg`
		}


		//downloading image with previous options (Don't bother about the old image, it will be overwritten since all of them have the same name)
		try {

    		const { filename, image } = await downloader.image(downloadOptions);
    		log('    -> Image downloaded!') ;

  		} catch (e) {

    		log('    -> Image download failed');
    		this.checkConnection();
  		}		
		

  		//stops checking for internet connection every 6 seconds
  		clearInterval(checkConnectionInterval);

  		//returns the image URL to be used in tweeter.js (to add URL to hash table when tweet is successfully sent)
		return imageURL;

	},

	//checks for internet connectivity, if no connection then trigger child process controller.js 
	checkConnection : function(){

		isOnline().then(online=>{

			if(!online){

				require('child_process').execSync('node controller.js',{stdio:[0,1,2]});

				process.exit();

			}

		});
	}
}
