const csv = require('csv-parser');
const fs = require('fs');

const read_devices = (res) => {

  var data = {};
  let file_name = './csv/devices.csv';
  fs.createReadStream(file_name)
    .pipe(csv())
    .on('data', (row) => {
      if(!data[row.category]) {
        data[row.category] = [];
      }
      data[row.category].push({
        device: row.device,
        image: row.image
      });
    })
    .on('end', () => {
      console.log("done reading " + file_name);
      res.json(data);
    });
}

exports.read_devices = read_devices;
