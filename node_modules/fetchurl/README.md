# fetchurl

[![NPM version](https://img.shields.io/npm/v/fetchurl.svg)](https://npmjs.org/package/fetchurl)
[![Build Status](https://img.shields.io/travis/popomore/fetchurl.svg)](https://travis-ci.org/popomore/fetchurl)
[![AppVeyor Status](https://img.shields.io/appveyor/popomore/fetchurl/master.svg)](https://ci.appveyor.com/project/popomore/fetchurl)
[![Build Status](https://img.shields.io/coveralls/popomore/fetchurl.svg)](https://coveralls.io/r/popomore/fetchurl)
[![NPM downloads](http://img.shields.io/npm/dm/fetchurl.svg)](https://npmjs.org/package/fetchurl)

Easy to download files

---

## Install

```
$ npm install fetchurl -g
```

## Usage

```
$ fetchurl https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superplus/js/min_super_ce213974.js
var fetchurl = require('fetchurl');
```

Also support file, create a file named `urls`

```
https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/tipsplus/js/min_tips_0e6bc704.js
https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/activity/js/activity_start_52498d2c.js
```

Then you can run

```
$ fetchurl ./urls
```

## LICENSE

Copyright (c) 2015 popomore. Licensed under the MIT license.
