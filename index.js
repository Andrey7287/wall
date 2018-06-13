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
    if (!req.body) return res.sendStatus(400);

    //console.log(`This it -> ${req.type} `);
    process.stdout(`This it -> ${req.type} `);

    res.sendStatus(200);
    res.send('ok');
});

app.listen(PORT, (err) => {
    if (err) {
        return console.log('something bad happened')
    }

    console.log(`server is listening on ${PORT}`)
});

var r = {
    "type": "wall_reply_new",
    "object": {
        "id": 2,
        "from_id": 457838735,
        "date": 1528898753,
        "text": "khjkhjkhj",
        "post_owner_id": -167677639,
        "post_id": 1
    },
    "group_id": 167677639
}