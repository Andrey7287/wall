//require('./app/index');

const app = require('express')(),
    PORT = process.env.PORT || 5000,
    https = require('https'),
    request = require('request'),
    fs = require('fs'),
    path = require('path'),
    gm = require('gm'),
    token = '92b5b7d038a4cb4618329a53e89ee452060b7efa9e923f840461303af0ca4e24f1a98ead85c72a3231072',
    apiUrl = 'https://api.vk.com/method/';

app.use(require('body-parser').json());

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// app.post('/wall', (req, res) => {
//     res.send('8ee1117a');
// });

https.get(`${apiUrl}photos.getOwnerCoverPhotoUploadServer?group_id=167677639&crop_x=0&crop_y=0&crop_x2=1590&crop_y2=400&access_token=${token}&v=5.50`, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    let data = JSON.parse(d.toString()),
        url = data.response.upload_url;
    
    let req = request.post(url, function (err, resp, body) {
        if (err) return console.log('Error str 33 !', err);
        const HASH = JSON.parse(body).hash,
              PHOTO =  JSON.parse(body).photo;

        https.get(`${apiUrl}photos.saveOwnerCoverPhoto?hash=${HASH}&photo=${PHOTO}&access_token=${token}&v=5.50`);
        
    });

    let form = req.form();

    form.append('photo', fs.createReadStream(__dirname+'/src/wall.jpg'));

  });

}).on('error', (e) => {
  console.error(e);
});


app.post('/wall', function (req, res) {
    if (!req.body) return res.sendStatus(400);

    //console.log(`This it -> ${req.type} `);
    https.get(`${apiUrl}users.get?user_ids=${req.body.object.from_id}&fields=photo_max_orig&v=5.50`, (res) => {
        console.log(res.response.photo_max_orig);
    });

    //console.log(`This it -> ${req.body.type} `);

    res.sendStatus(200);
    res.send('ok');


});

app.listen(PORT, (err) => {
    if (err) {
        return console.log('something bad happened')
    }

    console.log(`server is listening on ${PORT}`)
});

// var r = {
//     "type": "wall_reply_new",
//     "object": {
//         "id": 2,
//         "from_id": 457838735,
//         "date": 1528898753,
//         "text": "khjkhjkhj",
//         "post_owner_id": -167677639,
//         "post_id": 1
//     },
//     "group_id": 167677639
// }