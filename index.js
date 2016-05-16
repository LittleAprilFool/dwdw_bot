'use strict'
var config = require('./config.js')
var tg = require('telegram-node-bot')(config.token)

tg.router.
    when(['ping'], 'PingController')

tg.controller('PingController', ($) => {
    tg.for('ping', () => {
        $.sendMessage('pong')
    })
})

