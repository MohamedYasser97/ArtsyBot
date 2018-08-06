# ArtsyBot
Inspired by my bot skeleton [BatsyBot](https://github.com/MohamedYasser97/BatsyBot), ArtsyBot is a Twitter bot that tweets random art from reddit 


## Functions
  * The bot tweets jpg and png images randomly from given subreddits in any time interval (GIFs soon!).
  * Analysis mode for giving statistics about subreddits.
  * Data is stored in a hash table to prevent tweeting duplicated media.
  * Readable and informative console logs with important data describing every process of sending a tweet.
  * All logs are stored in different files.
  * The bot has a safety mechanism that aborts the app automatically when there is no Internet connection and restarts
  when the connection returns without messing with the tweet time intervals.
  

## Usage
After cloning this repository, you'll need to take a look on these files:
  * __config.js__\
   This file contains the Twitter API keys that can be accessed from [here](https://apps.twitter.com/).
  - - - - 
  * __bot.js__\
   This is the bot's main file. In this file you can specify the interval between every tweet and you can also enable
   or disable analysis mode by uncommenting its called function.
  - - - -
  * __subreddits.js__\
   Enter the names of all the subreddits you want the bot to get and tweet random images from.
  - - - -
  \
  Now start the bot with the command:
  `npm start`\
  \
  For further info., visit [BatsyBot](https://github.com/MohamedYasser97/BatsyBot) and read its [README file](https://github.com/MohamedYasser97/BatsyBot/blob/master/README.md)
  
 ## Personal Request
   Anyone can use this project as they like but I would love to get credited in any possible way. Let it be a mention on Twitter, an E-mail or 
   a Facebook message. Just let me know if my project is useful in any way or if something needs to be fixed. Happy coding and I hope you build amazing bots!\
   [Twitter](https://twitter.com/yassermo97)\
   [Facebook](https://www.facebook.com/myasser99)\
   __mhmd.yasser@gmail.com__
   
 ## License
 __MIT License__

Copyright (c) 2018 Mohamed Yasser (mhmd.yasser@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

