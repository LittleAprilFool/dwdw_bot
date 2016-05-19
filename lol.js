'use strict'

var request = require('request')
const url = "http://API.xunjob.cn/"


module.exports = {
    getRank(playerName, serverName){
        var rankUrl = url + 's5str.php?' + 'playerName=' + encodeURIComponent(playerName) + '&serverName=' + encodeURIComponent(serverName)
        return new Promise((resolve, reject)=>{
            request(rankUrl, (err, res, body) => {
	        if(!err && res.statusCode == 200) {
		    var lolRank = JSON.parse(body)
		    console.log(lolRank)
		    resolve(lolRank)
	        }
    	    })
        })
    }
}

