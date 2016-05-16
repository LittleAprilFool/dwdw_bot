var request = require('request')
const url = "http://API.xunjob.cn/"

function getRank(){
    var playerName = 'littleaprilfool'
    var serverName = '电信十六'
    var rankUrl = url + 's5str.php?' + 'playerName=' + playerName + '&serverName=' + serverName
    console.log(rankUrl)
    return new Promise((resolve, reject) => {
        request(rankUrl, (err, res, body) => {
            if(!err & res.statusCode == 200){
                console.log(body)
            }
        })
    })
}

getRank()
