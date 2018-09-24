const fs = require('fs');

const colors = require('colors');
const Flickr = require('flickr-sdk');
const sizeOf = require('image-size');
const mime = require('mime/lite');

// call the flickr.photos.search API method and search the photos!

exports.command = 'ls <dir>';
exports.desc = 'Use filenames in <dir> as search terms (one at a time)';
exports.builder = {
  dir: {
    default: '.'
  }
};
exports.handler = function (argv) {
  const flickr = new Flickr(Flickr.OAuth.createPlugin(
    argv.key,
    argv.secret,
    argv.oauth_token,
    argv.oauth_token_secret
  ));

  fs.readdir(argv.dir, (err, files) => {
    files.forEach((file) => {
      if (fs.statSync(file).isFile()) {
        let type = mime.getType(file);
        let type_group = type.split('/')[0];
        let dimmensions = (type_group === 'image') ? sizeOf(file) : undefined;
        // we only want videos and images
        if (['video', 'image'].indexOf(type_group) > -1
            // we only want images larger than 500 wide (anything smaller is
            // likely a thumbnail or an icon
            && (undefined === dimmensions || dimmensions.width > 500)) {

          let text = file.substr(0, file.lastIndexOf('.'));
          // Flickr's search uses `-` for negative searches...so file names
          // starting with that will get *everything else* as the result...
          // Removing the `-` at least gets us a little closer.
          if (text[0] === '-') {
            text = text.substr(1);
          }
          flickr.photos.search({
            text: text,
            user_id: 'me'
          }).then(function (res) {
            let total = res.body.photos.total;
            let color = 'green';
            if (total < 1) {
              color = 'red';
            } else if (total > 1) {
              color = 'yellow';
            }
            console.log(`Found ${total} result(s) for ${file} ${type}`[color]);
            res.body.photos.photo.forEach((photo) => {
              console.log(photo.title,
                          `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
            });
          }).catch(function (err) {
            console.error('bonk', err);
          });
        }
      }
    });
  })

};
