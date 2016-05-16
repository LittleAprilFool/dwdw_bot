/**!
 *
 * Download url to dest
 *
 * Copyright (c) 2015 popomore. Licensed under the MIT license.
 *
 * Authors:
 *   popomore <sakura9515@gmail.com>
 */

'use strict';

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var urllib = require('urllib');

module.exports = function* download(url, destfile) {
  var dirname = path.dirname(destfile);
  yield mkdirpThunk(dirname);
  var result = yield urllib.requestThunk(url, {
    followRedirect: true,
    writeStream: fs.createWriteStream(destfile)
  });
  if (result.status >= 300) {
    throw new Error('Download got statusCode ' + result.status);
  }
  var len = result.headers['content-length'];
  yield assertSize(destfile, len);
};

function mkdirpThunk(dirname) {
  return function(done) {
    mkdirp(dirname, done);
  };
}

function assertSize(destfile, len) {
  return function(done) {
    fs.stat(destfile, function(err, stat) {
      if (err) {
        return done(err);
      }
      if (stat.size !== Number(len)) {
        return done(new Error(stat.size + ' is not equal to ' + len));
      }
      done();
    });
  };
}
