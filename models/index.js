'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String ,default: null},
  create_time: { type: Date, default: Date.now },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'uncompleted', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Users', UserSchema);
