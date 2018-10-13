var fetch = require('node-fetch');

/*
    I initially used a npm package called redditimage but it 
    had deprecated unhandled promise exceptions and used 
    (snekfetch) that was also deprecated and it wasn't 
    updated for a long time and its github repo was deleted 
    and I couldn't contact its owner so I eddited his module
    and used (node-fetch) and added some other useful functionality
*/

//returns -1 if it doesn't find a non-crossposted jpg/png image
//UPDATE: URL formats have been updated but I still have to return the old format to check it against the hash table
const getURL =  function(subreddit){

	return new Promise((resolve, reject) => {

        fetch(`https://www.reddit.com/r/${subreddit}/random.json?limit=1`)
        .then(res => res.json())
        .then(json => {

            let image;
            let oldImage;
            let crossParent;
            let permalink;

            try {

                image = json[0].data.children[0].data.url;
                oldImage = json[0].data.children[0].data.preview.images[0].source.url;
                crossParent = json[0].data.children[0].data.crosspost_parent;
                permalink = json[0].data.children[0].data.permalink;

            } catch (error) {

                image = json.data.children[0].data.url;
                oldImage = json[0].data.children[0].data.preview.images[0].source.url;
                crossParent = json.data.children[0].data.crosspost_parent;
                permalink = json[0].data.children[0].data.permalink;

            }

            if(!image) 
            	return resolve('-1');

            if(crossParent)
                return resolve('-1');

            let extension = image.substring(image.lastIndexOf('.')+1,image.lastIndexOf('.')+4);

            if(extension!='jpg' && extension!='png')
            	return resolve('-1');
            
            return resolve([image,oldImage,permalink]);

        })
        .catch((err) => {

            return resolve('-1');
        });

	});

};

module.exports=getURL;
