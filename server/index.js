


const express = require('express');
const cors = require('cors');
const axios = require('axios');

const { toast } = require('react-toastify');



const sid = "ACfe6439b1f02c37460d5b52e6a3f69504";
const auth_token = "ab87dc64c07bac9e9991d91070c7a589";

const twilio = require("twilio")(sid, auth_token);

const numbers = [+2348073374150, +2348140694509]






const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to the Express Server')
})


app.get('/send-text', (req, res) => {






    const { recipient, textmessage } = req.query;

    // console.log(recipient)

    Promise.all(
        numbers.map(number => {
            return twilio.messages.create({
                to: recipient,
                from: 'MG686dcacaf885f17d09717b20f5174ee1',
                body: textmessage
            });
        })
    )
        .then(messages => {

            console.log('Messages sent!');
        })
        .catch(err => console.error(err));

})

app.listen(4000, () => console.log("Running on Port 4000"))