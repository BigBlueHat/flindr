const Flickr = require('flickr-sdk');

// call the flickr.photos.search API method and search the photos!

exports.command = 'search <text>';
exports.desc = 'Search your photos for <text>';
exports.builder = {};
exports.handler = function (argv) {
  const flickr = new Flickr(Flickr.OAuth.createPlugin(
    argv.key,
    argv.secret,
    argv.oauth_token,
    argv.oauth_token_secret
  ));

  flickr.photos.search({
    text: argv.text,
    user_id: 'me'
  }).then(function (res) {
    console.log(`Found ${res.body.photos.total} results for ${argv.text}`);
    res.body.photos.photo.forEach((photo) => {
      console.log(photo.title,
                  `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
    });
  }).catch(function (err) {
    console.error('bonk', err);
  });
};
