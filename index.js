//require('./app/index');

const app = require('express')(),
      PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//     res.send('Hello from Express!')
// });

app.post('/wall', (req, res) => '8ee1117a');

app.listen(PORT, (err) => {
    if (err) {
        return console.log('something bad happened')
    }

    console.log(`server is listening on ${port}`)
});

