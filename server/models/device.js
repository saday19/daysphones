const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  device: {
    type: String,
    required: true
  },
  carrier: {
    type: String
  },
  storage: {
    type: String
  },
  condition: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  enable: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
