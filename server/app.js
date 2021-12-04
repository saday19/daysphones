const express = require('express');
const csv_handler = require('./logic/csv_handler')
const mongoose = require('mongoose');
const Device = require('./models/device');
const User = require('./models/user');
const Session = require('./models/session');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const token_generator = require('./logic/token_generator');

const sessions = {};

app = express();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

const PORT  = process.env.PORT || 3001;

const db_URI = 'mongodb+srv://saday:Sad77889900!!@cluster0.c3bqg.mongodb.net/app?retryWrites=true&w=majority';
mongoose.connect(db_URI)
.then((result) => {
  console.log('Connected to database...');
  console.log('Starting node application...');
  app.listen(PORT, () => {
    const url = `http://localhost:${PORT}/`;
    console.log(`Listening on ${url}`);
  });
})
.catch((err) => console.log(err));

app.use(cors())

app.set('view engine', 'ejs');
app.use('/api/categories/', (req, res) => {
  res.json(
    [
    {
      name: "Cell Phone",
      image: "/images/iphone.jpg",
      path: "/sell-device"
    },
    {
      name: "Tablet",
      image: "/images/tablet.jpg",
      path: "/sell-device"
    },
    {
      name: "Smart Watch",
      image: "/images/iwatch.jpg",
      path: "/sell-device"
    }
  ]
  )
});

app.use('/api/testimonials/', (req, res) => {res.json([{name: "Andrew G.",text: "\"Excellent company. I’ve sold several devices to them. Service is always  prompt, exchange is always easy. I can always sell my phone the same day that I inquired and know I’ll get a fair price.\""}])});

app.use('/api/devices/', (req, res) => {
  csv_handler.read_devices(res);
});

app.post('/api/login', jsonParser, (req, res) => {
  bcrypt.hash(req.body.password, 9, (err, hash) => {
    User.findOne({username: req.body.username}, (err, usr) => {
      if(usr) {
        bcrypt.compare(req.body.password, hash, (err, result) => {
          console.log("checking login for " + req.body.username);
          if(result) {
            console.log("password correct, responding with token...")
            let token = token_generator.generate();
            let session = new Session();
            session.token = token;
            session.username = req.body.username;
            session.save();
            res.send({username: req.body.username, token: token, loginSuccess: true});
          } else {
            console.log("password incorrect, responding with {loginSuccess: false}...")
            res.send({loginSuccess: false});
          }
        });
      } else {
        console.log("user not found, responding with {loginSuccess: false}...")
        res.send({loginSuccess: false});
      }
    });
  });
});

app.post('/api/is-logged-in', jsonParser, (req, res) => {
  token = req.body.token;
  username = req.body.username;
  Session.findOne({token: token}, (err, result) => {
    if(result) {
      if(result.username == username) {
        res.send({loggedIn: true});
      } else {res.send({loggedIn: false})}
    } else {res.send({loggedIn: false})}
  });
});

app.post('/api/add-device/', jsonParser, (req, res) => {
  console.log("request for add device " + req.body.data);
  res.send(req.body.data);
});
