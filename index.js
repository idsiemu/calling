require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000

app.get('/', async(req, res) => {
    // axios.get(`https://preview.twilio.com/Numbers/ActiveNumbers`, {
    //         auth: {
    //             username: accountSid,
    //             password: authToken
    //         }
    //     },
    // )
    // .then((res) => { console.log(res); })
    // .catch((error) => { console.log(error) })

    // try{
        
    //     // const result = await client.numbers
    //     // console.log(result)
    // }catch(err) {
    //     console.log(err)
    // }


    res.send({item: 'asdf'})
})

app.post('/calling', async(req, res) => {
    
    // const to = req.body.to
    // const from = req.body.from
    try{
        const called = await client.calls
              .create({
                 url: 'http://demo.twilio.com/docs/voice.xml',
                 to: '+821067128555',
                 from: '+17604965570',
                 statusCallback: `${API_DOMAIN}callback`,
                 statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
                 statusCallbackMethod: 'POST'
               })
        console.log(called)
    }catch(e) {
        console.log(e)
    }
    res.send({item: 'called'})

})

app.post('/callback', (req, res) => {
    console.log('asdfasdf')
    res.send({})
})

app.listen(port, () => {
    console.log(`api server on boot`)
})