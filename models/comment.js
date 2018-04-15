'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  user_id: { type: String },
  post_id: { type: String },
  slug : { type: String, required: true },
  create_time: { type: Date, default: Date.now },
  post_schema: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  },
  status: {
    type: [{
      type: String,
      enum: ['b_public', 'b_friend', 'b_firend_except','b_only_me','b_custom']
    }],
    default: ['b_public']
  }
});

module.exports = mongoose.model('comments', CommentSchema);