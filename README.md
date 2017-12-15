# 3nit-utils

Utils for setting up a Next.js project

Minimal `server.js` setup:

```js
require('babel-polyfill')
require('babel-register')({presets: ['es2015', 'stage-0']})
require('dotenv').config()

const utils = require('3nit-utils')

const {db, server} = utils
const dev = process.env.NODE_ENV !== 'production'

const models = require('../config/models')

require('debug').enable('dev')

db.init(require('mongoose'), 'mongodb://localhost/*****', models).then(() => {
  server.init({
    port: dev ? 4000 : 8049,
    app: require('next')({ dev, dir: '.' }),
    routes: require('./api').routes})
})
```
