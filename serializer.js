var fs = require('fs');

/*
	Checking for crossposts wasn't enough because that reddit
	endpoint isn't so "random" and the same URL may get fetched
	after an hour or even less! So I decided to add every used URL
	to a hash table. Initially, I used javascript's Map but then
	discovered that JSON.stringify doesn't work on Maps so I ended
	up with using a normal object and wrote the hash table functions 
	myself. The hash table exports and imports all of its data from
	a json file so data isn't lost when I close the app.
*/

if(fs.existsSync('./data/data.json')==false)
	fs.appendFileSync('./data/data.json','{}');

var map = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

module.exports={

	//example of how a url looks like: 'https://i.redditmedia.com/QOOy-WZ3OO0yWJaFkjmKJ0AzT2F4NGlkLnLEzMQHqfY.jpg?s=454a0b04a2b06661680aa05e12f9c40b'
	//UPDATED URL: https://i.redd.it/gakoldunusr11.jpg
	//I don't really care about the url so I will just put 0/1 in the value field of the map. Also, the whole links to every image are alreaddy logged in separate files

	//takes the string after the last slash and before the first and only query in the URL and returns it as the hash key
	generateKey : function(url){

		return url.slice(url.lastIndexOf('/')+1 , url.lastIndexOf('.'));
	},

	//checks if the URL already exists in the hash table to prevent duplication
	exists : function(url){

		if(map[this.generateKey(url)])
			return true;

		return false;
	},

	//after updating the image URL format I still have to check for the existing old URL format in the table
	existsOld : function(url){

		if(map[url.slice(url.lastIndexOf('/')+1 , url.lastIndexOf('?'))])
			return true;

		return false;

	},

	/*
		This function is a piece of hack. I figured that after some time the hash table
		will contain so much data it would be stupid to overwrite the whole json file
		every time I fetch a URL so I thought that instead I should append to the file.
		To do that I had to first delete the closing brace (}) and then add a comma (,)
		before appending the key and value of the URL, I searched for too long for a function 
		that does just that and couldn't find a solution that doesn't involve importing
		a whole other npm package. However, I figured out that with FileSystem's truncate 
		function I could pass a smaller file size so it would shrink the json file by deleting
		by a certain amount of bytes from the end and that's exactly what I want! So I took the 
		file's size and subtracted from it 1 byte which is the space taken by a single character (})
	*/
	add : function(url){

		if(this.exists(url))
			return;
		
		map[this.generateKey(url)]=1;

		let stat = fs.statSync('./data/data.json');

		fs.truncateSync('./data/data.json',stat.size-1);
		fs.appendFileSync('./data/data.json',`${stat.size==2 ? '' : ','}"${this.generateKey(url)}":1}`);

	}

}
