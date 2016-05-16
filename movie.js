'use strict'

var request = require('request')

const url = 'https://api.douban.com/v2/movie/in_theaters'

module.exports = {
    movieInTheater(){
        return new Promise((resolve, reject) => {
            request(url, (err, res, body) => {
                if(!err && res.statusCode == 200){
                    var movielist = JSON.parse(body).subjects
                    var topMovie = []
                    for (var i in movielist) {
                        if(movielist[i].rating.average > 6.5) {
                            var movie = new Object()
                            movie['rating'] = movielist[i].rating.average
                            movie['title'] = movielist[i].title
                            topMovie.push(movie)
                        }
                    }
                    resolve(topMovie)
                }
            })
       })
    }   
}
