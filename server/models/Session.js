const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  sessionActivity: { type: Date, expires: '1800s', default: Date.now },
  token: { type: String, required: true },
  username: {type: String, required: true }
});

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;
