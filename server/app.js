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
const EasyPost = require('@easypost/api');
const api = new EasyPost('EZTKb3f13c7f7c4f48e89796d47b78b42ffe7zDqNCdFpjYaTgR4XaHefg');

const fromAddress = new api.Address({
  //company: 'EasyPost',
  street1: '417 Montgomery Street',
  street2: '5th Floor',
  city: 'San Francisco',
  state: 'CA',
  zip: '94104',
  phone: '415-528-7555'
});

const toAddress = new api.Address({
  name: 'George Costanza',
  company: 'Vandelay Industries',
  street1: '1 E 161st St.',
  city: 'Bronx',
  state: 'NY',
  zip: '10451'
});

const parcel = new api.Parcel({
  length: 9,
  width: 6,
  height: 2,
  weight: 10,
});

const shipment = new api.Shipment({
  to_address: toAddress,
  from_address: fromAddress,
  parcel: parcel
});

shipment.save().then(s =>
  s.buy(shipment.lowestRate(['USPS'], ['First']))
    .then(res => {
      console.log(shipment.postage_label.label_url);
    })
);


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
  Device.find({}, (err, docs) => {
    let data = {};
    docs.forEach(device => {
      if(!data[device.category]) {
        data[device.category] = [];
      }
      if(!(data[device.category].length > 0)) {
        if(device.enable) {
          data[device.category].push({
            device: device.device,
            image: device.image
          });
        }
      }
    });
    res.json(data);
  })
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
  let data = req.body.data;
  let new_device = new Device();
  new_device.category = data.category;
  new_device.device = data.device;
  new_device.carrier = data.carrier;
  new_device.storage = data.storage;
  new_device.condition = data.condition;
  new_device.price = data.price;
  new_device.image = data.image;
  new_device.save();
  res.send({message: "addition successful"});
});

app.post('/api/update-device', jsonParser, (req,res) => {
  Device.findByIdAndUpdate(req.body._id, req.body, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
});

app.post('/api/get-device-variations', jsonParser, (req, res) => {
  Device.find({device: req.body.device.device}, (err, doc) => {
    const carriers = [];
    const storages = [];
    const conditions = [];
    for(const device of doc) {
      if(device.enable) {
        if(!carriers.includes(device.carrier)) {
          carriers.push(device.carrier);
        }
        if(!storages.includes(device.storage)) {
          storages.push(device.storage);
        }
        if(!conditions.includes(device.condition)) {
          conditions.push(device.condition);
        }
      }
    }
    res.send({
      carriers: carriers,
      storages: storages,
      conditions: conditions
    });
  });
});

app.post('/api/generate-offer', jsonParser, (req, res) => {
  if(req.body.data) {
    Device.findOne({
      device: req.body.data.device,
      condition: req.body.data.condition,
      carrier: req.body.data.carrier,
      storage: req.body.data.storage
      }, (err, doc) => {
        if(err) console.log(err);
        else res.send(doc);
      });
  }
});

app.get('/api/get-all-devices', jsonParser, (req, res) => {
  Device.find({}, (err, doc) => {
    res.json(doc);
  });
});
