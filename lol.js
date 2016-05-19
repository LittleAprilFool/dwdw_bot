var request = require('request')
var http = require('http')
const url = "http://API.xunjob.cn/"

function getUrl(url) {
    return http.get(url, (response) => {
        var body = ''
        response.on('data', (d) => {
            body += d
        })
        response.on('end', () => {
            console.log(body)
            console.log(JSON.parse(body))
        })
    })

}

function getRank(){
    var playerName = 'littleaprilfool'
    var serverName = '电信十六'
    var rankUrl = url + 's5str.php?' + 'playerName=' + encodeURIComponent(playerName) + '&serverName=' + encodeURIComponent(serverName)
    var test = getUrl(rankUrl, null)
    //console.log(test)
    //return new Promise((resolve, reject) => {
    //   request(rankUrl, (err, res, body) => {
    //        if(!err & res.statusCode == 200){
    //            console.log(body)
    //        }
    //    })
    //})
}

getRank()
