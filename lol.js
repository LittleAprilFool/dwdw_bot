'use strict'

var fs = require('fs')
var request = require('request')
var config = require('./config.json')
const url = "http://www.games-cube.com/combat/api/"

module.exports = {
    getFreeHero() {
        var freeUrl = url + 'Free'
        return new Promise ((resolve, reject) => {
            request (freeUrl, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    var freeHero = JSON.parse(body)
                    resolve(freeHero)
                }
            })    
        })
    },

    getRank(playerName, serverName) {
        var rankUrl = url + 's5str.php?' + 'playerName=' + encodeURIComponent(playerName) + '&serverName=' + encodeURIComponent(serverName)
        return new Promise ((resolve, reject) => {
            request (rankUrl, (err, res, body) => {
	            if (!err && res.statusCode == 200) {
		            var lolRank = JSON.parse(body)
		            resolve(lolRank)
	            }
    	    })
        })
    },

    getUserArea(userName) {
        var userUrl = url + 'UserArea?' + 'keyword=' + userName
        var options = {
            url:userUrl,
            headers: {
                "DAIWAN-API-TOKEN": config.daiwan_token
            }
        }
        return new Promise ((resolve, reject) => {
            request (options, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    resolve(JSON.parse(body))
                }
            })
        }) 
    }   
}

function getDaiwanToken() {
    var loginUrl = url + 'login?' + 'username=' + config.daiwan_username + '&password=' + config.daiwan_password
    request(loginUrl, (err, res, body) => {
        if(!err && res.statusCode == 200) {
            var daiwanToken = JSON.parse(body)
            if(daiwanToken.code == 1) {
                config['daiwan_token'] = daiwanToken.key
                fs.writeFile('config.json', JSON.stringify(config, null, 4), (err) => {
                    if(err) console.log(err)   
                })
            }   
        }
    })
}

function getCombatList(qquin) {
	var combatUrl = url + 'CombatList?' + 'qquin=' + qquin + '&vaid=' + vaid + '&p=1'
	var options = {
		url:combatUrl,
		headers: {
			"DAIWAN-API-TOKEN":config.daiwan_token
		}
	}
	request(options, (err, res, body) => {
		console.log(JSON.parse(body))
	})
}

