/**!
 *
 * Fetch url with given url or file
 *
 * Copyright (c) 2015 popomore. Licensed under the MIT license.
 *
 * Authors:
 *   popomore <sakura9515@gmail.com>
 */

'use strict';

var fs = require('fs');
var join = require('path').join;
var download = require('./lib/download');

function* fetch(opt) {
  opt || (opt = {});
  var dest = opt.dest || process.cwd();

  // fetch file
  if (opt.file) {
    var urls = yield readFile(opt.file);
    return yield urls.map(function(url) {
      return fetch({url: url, dest: dest});
    });
  }

  // fetch url
  var url = opt.url;

  if (!/^https?:\/\//.test(url)) {
    throw new Error(url + ' is not url');
  }

  var filepath = join(dest, url.replace(/^https?:\/\/.*?\//, ''));
  yield download(url, filepath);
  console.info('Downloaded `%s` to `%s`', url, filepath);
}

function* readFile(file) {
  var contents = fs.readFileSync(file).toString();
  return contents.split('\n').filter(function(val) {
    return !!val;
  });
}

module.exports = fetch;
