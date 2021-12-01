const express = require('express');
const csv_handler = require('./logic/csv_handler')
app = express();

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

app.use('/api/testimonials/', (req, res) => {
  res.json(
    [
      {
        name: "Andrew G.",
        text: "\"Excellent company. I’ve sold several devices to them. Service is always  prompt, exchange is always easy. I can always sell my phone the same day that I inquired and know I’ll get a fair price.\""
      }
    ]
  )
});

app.use('/api/devices/', (req, res) => {
  csv_handler.read_devices(res);
});

const PORT  = process.env.PORT || 3001;

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`;
  console.log(`Listening on ${url}`);
})
