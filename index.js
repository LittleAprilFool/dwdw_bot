'use strict'
var fs = require('fs')
var config = require('./config.js')
var tg = require('telegram-node-bot')(config.token)
var usersheet = require('./user.json')
var movie = require('./movie.js')

tg.router
    .when(['ping'], 'PingController')
    .when(['/start'], 'StartController')
    .when(['/movie'], 'MovieController')
    .otherwise('AllController')

tg.controller('PingController', ($) => {
    tg.for('ping', () => {
        $.sendMessage('pong')
    })
})

function checkUser($) {
    for (var user in usersheet) {
        if (usersheet[user].id == $.message.from.id) return;
    }
    console.log("Add New User")
    var newuser = new Object()
    newuser["id"] = $.message.from.id
    newuser["username"] = $.message.from.username
    newuser["first_name"] = $.message.from.first_name
    newuser["last_name"] = $.message.from.last_name
    usersheet.push(newuser)
    updateUserSheet()
}

function updateUserSheet(){
    fs.writeFile('user.json', JSON.stringify(usersheet, null, 4), (err) => {
        if(err)
            console.log(err);
    })
}

tg.controller('StartController', ($) => {
    $.sendMessage('Hello, ' + $.message.from.username);
    checkUser($); 
})

function queryMovie($) {
    movie.movieInTheater().then((val) => {
        var returnMessage = '最近可以看的大于6.5分的电影有'
        for(var i in val)
            returnMessage = returnMessage + val[i].title + '(' + val[i].rating + ') '
            $.sendMessage(returnMessage)
    })
}

tg.controller('MovieController', ($) => {
    queryMovie($)
})

tg.controller('AllController', ($) => {
    if(typeof $.message.text != 'undefined'){
        var str = $.message.text
        var re = /dy|电影|今晚有没有/
        var found = str.match(re)
        if(found != null) queryMovie($)
    }
})
