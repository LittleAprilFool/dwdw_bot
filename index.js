'use strict'
var fs = require('fs')
var config = require('./config.json')
var tg = require('telegram-node-bot')(config.token)
var usersheet = require('./user.json')
var movie = require('./movie.js')
var lol = require('./lol.js')

tg.router
    .when(['ping'], 'PingController')
    .when(['/start'], 'StartController')
    .when(['/movie'], 'MovieController')
    .when(['/lol'], 'LOLController')
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

function queryMovie($) {
    movie.movieInTheater().then((val) => {
        var returnMessage = '最近可以看的大于6.5分的电影有'
        for(var i in val)
            returnMessage = returnMessage + val[i].title + '(' + val[i].rating + ') '
            $.sendMessage(returnMessage)
    })
}

function queryLOL($) {
    for(var user in usersheet) {
        if(usersheet[user].id == $.message.from.id) {
            lol.getRank(usersheet[user].player_name, usersheet[user].server_name).then((val) => {
                if(val.tier != null) $.sendMessage('你的段位是' + val.tier + val.rank + "，要不要和dw一起上分？")
                    else $.sendMessage('噫，你还没有段位，多打打匹配再来找dw上分吧')
            })
        }
    }
}

function queryLOLFree($) {
    lol.getFreeHero().then((val) => {
        var returnMessage = "打呀打呀，听说这周周免有"
        for(var i in val) {
            var t = val[i]
            returnMessage = returnMessage + t.name + '（' + t.title + '） '
        }
        $.sendMessage(returnMessage)
    })
}

tg.controller('StartController', ($) => {
    $.sendMessage('Hello, ' + $.message.from.username);
    checkUser($); 
})

tg.controller('MovieController', ($) => {
    checkUser($)
    queryMovie($)
})

tg.controller('LOLController', ($) => {
    checkUser($)
    queryLOLFree($)
})

tg.controller('AllController', ($) => {
    if(typeof $.message.text != 'undefined'){
        checkUser($)
        if($.message.text.match(/kdy|电影|今晚有没有/) != null) queryMovie($)
        if($.message.text.match(/dyx|游戏|今晚有没有/) != null) queryLOLFree($)
    }
})

