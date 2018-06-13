//require('./app/index');

const app = require('express')(),
      PORT = process.env.PORT || 5000,
      jsonParser = require('body-parser').json();


app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// app.post('/wall', (req, res) => {
//     res.send('8ee1117a');
// });


app.post('/wall', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    res.send(`This it -> ${res.type} `);
});

app.listen(PORT, (err) => {
    if (err) {
        return console.log('something bad happened')
    }

    console.log(`server is listening on ${PORT}`)
});

