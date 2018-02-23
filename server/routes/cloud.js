var express = require('express');
var router = express.Router();
const _ = require('lodash');
const stopwords = require('stopwords').english

const twit = require('twitter'),
  twitter = new twit({
    consumer_key: '~',
    consumer_secret: '~',
    access_token_key: '~',
    access_token_secret: '~'
} );

mapWords = (cleaned) => {
  return _.reduce(cleaned, function(wordMap, w) {
    if (w !== '' && w !== undefined) {
      wordMap[w] = (wordMap[w] + 1) || 1
    }
    return wordMap
  }, {})
}

removeStopWords = (trimmed) => {
  return _.filter(trimmed, function(w) {
    return stopwords.indexOf(w.toLowerCase()) < 0
  }).join(' ').toLowerCase().split(' ')
}

removeLinks = (splitTweet) => {
  const tweetWithoutLink = splitTweet.splice(0,splitTweet.indexOf('https')-1)
  if (tweetWithoutLink.length !== 0) {
    return removeStopWords(tweetWithoutLink)
  }
  return removeStopWords(splitTweet)
}

getRandomTweets = (tweets) => {
  const sampleTweets = _.sampleSize(tweets, 25)
  return _.map(sampleTweets, function(tweet) {
    if (!tweet.truncated) {
      const splitTweet = tweet.text.split(/[^A-Za-z_#@]/)
      return removeLinks(splitTweet)
    }
  })
}


/* GET users tweets. */
router.get('/:twitterhandle', function(req, res, next) {
  const twitterHandle = req.params.twitterhandle;
  twitter.get('statuses/user_timeline/' + twitterHandle,
              {count: 6000, exclude_replies: true, include_rts: false},
              function(error, tweets, response) {
    if (error) {
      res.status(400).send({error: 'Page not found'})
    } else {
      const randTwits = getRandomTweets(tweets)
      const combinedTwits = [].concat(...randTwits)
      const words = mapWords(combinedTwits)
      const wordCollection = _.shuffle(_.map(_.toPairs(words), d => _.fromPairs([d])))
      const userInfo = tweets[0].user
      res.send({handle: userInfo.screen_name,
                avatar: userInfo.profile_image_url_https,
                words: wordCollection});
    }
  });
});

module.exports = router;
