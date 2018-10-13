var table = require('./serializer');
var fs = require('fs');
var main = require('./bot');
var downloader = require('./downloader');
var log = require('./logger');

module.exports={

	//uses the Twit package object created in the main bot file to send an image
	//First get the image path, upload image to twitter and then attach image to tweet and post the tweet
	tweetImage : async function(){
		
		var url = await downloader.getImage();
		var b64 = fs.readFileSync('./images/x.jpg', { encoding: 'base64' });
    
		log('* Uploading image...');

		main.T.post('media/upload', {media_data: b64}, function (err, data, response) {

  			var mediaId = data.media_id_string;

  			main.T.post('media/metadata/create', {media_id: mediaId}, function (err, data, response) {
    			if (!err) {

    				log('    -> Image uploaded!\r\n* Sending tweet...');

      				main.T.post('statuses/update', {media_ids: [mediaId]}, function (err, data, response) {

      					if(err){
      						log(`    -> Error sending tweet!\r\n    -> ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()},${new Date().toLocaleString('en-GB',{timezone: 'Africa/Cairo',hour12: true}).split(',').pop()}\r\n----------------------------------------------------------`);
      						      						
                  process.exit();
      						return;
      					}

                //doesn't add the URL to the hash table unless the tweet is successfully sent
      					table.add(url);

      					log(`    -> Tweet sent!\r\n    -> ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()},${new Date().toLocaleString('en-GB',{timezone: 'Africa/Cairo',hour12: true}).split(',').pop()}\r\n----------------------------------------------------------`);

                return;
      				});

    			}else{

    				log('    -> Error uploading image!');
    				   				
            process.exit();
            return;
    			}
  			});
		});

	}

}
