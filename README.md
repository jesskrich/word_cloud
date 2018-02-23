# ERN Stack Twitter Word Cloud
#### Twitter API with ReactJS and Node/Express
##### Node v. 8.4

## Setup Instructions
Before attempting to run this app, please visit the [Twitter Developer Docs](https://developer.twitter.com/en/docs/basics/authentication/guides/access-tokens) to create or retrieve your own personal access tokens, which will be needed to authenticate usage of the twitter API.

Once you have your credentials:

```
$ git clone https://github.com/jesskrich/word_cloud/
$ cd server
$ npm install
```

In the folder, **/routes**, open **cloud.js**, and enter your Twitter Developer credentials into the following code block:

```
const twit = require('twitter'),
  twitter = new twit({
    consumer_key: '~',
    consumer_secret: '~',
    access_token_key: '~',
    access_token_secret: '~'
  });
  ```
  
  Now cd into the **/client** folder and run install client-side dependencies:
  
  ```
  npm install
  ```
  
 ## Running Instructions
 From the root of the **/server** folder, run:
 
 ```
 $ PORT=3001 npm start
 ```
 
 If you decide to change the port number you use for the server, you must also change it in the **/client** folder under **package.json** by editing the proxy.
 
 ```
 "proxy": "http://localhost:3001"
 ```
 
 Back in the command line, open a new **terminal**, and from the root of the client folder, run:
 
 ```
 npm start
 ```
 
 Open your browser and visit `localhost:3000`
