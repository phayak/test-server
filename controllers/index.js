// 'use strict';

// var mongoose = require('mongoose');
// var User = mongoose.model('Users');
// var jwt = require('jsonwebtoken');

// exports.register_post = function(req, res) {
//   var new_user = new User(req.body);
//   new_user.save(function(err, users) {
//     if (err)
//       res.send(err);
//     res.json(users);
//   });

// };
// exports.user_all = function(req, res) {
//   User.find({}, function(err, users) {
//     if (err)
//       res.send(err);
//     res.json(users);
//   });
// };