const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  expirationDate: {
    type: Date,
    expires: 300,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  token: { type: String, required: true },
  username: { type: String, required: true },
})

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;
