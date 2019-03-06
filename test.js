const express = require('express')
const request = require('request')
const app = express()
const port = 3000

app.get('/', (req,res)=>
	res.send('Hello, world!'))

app.get('/token', (req, res)=>{
	request.post('https://id.twitch.tv/oauth2/token?client_id= 9w7ybx2916ez3pmmh7cpv6skqq6wug&client_secret=rcnj6kf4d48cdfge0vwhpbt7r4secv&grant_type=client_credentials', {}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
})
})

app.get('/twitch', (req, res)=>
	{	
	console.log('haha')
	console.log(req.query)
	console.log(req.body)
	res.send(req.query['hub.challenge'])
}
)

app.post('/twitch', (req, res)=>{
	console.log('hehe')
	console.log(req.body)
	res.send('200')
})

app.listen(port, ()=> console.log('Example app listening on port ${port}!'))
