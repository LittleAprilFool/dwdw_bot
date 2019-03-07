const express = require('express')
const request = require('request')
const app = express()
const port = 3000

app.use(require("body-parser").json())

let sendMessage = null


module.exports = {
	updateSubscribers(subscribers){
		console.log(subscribers)
	},

	initialize(callback){
		sendMessage = callback
	}
}


app.get('/', (req,res)=>
	res.send('Hello, world!'))

app.get('/twitch', (req, res)=>{	
	res.send(req.query['hub.challenge'])
})

app.post('/twitch', (req, res)=>{
	var payload = req.body
	sendMessage(payload.data[0].user_id)
	res.sendStatus(200)
})

app.listen(port, ()=> console.log('Example app listening on port ${port}!'))
