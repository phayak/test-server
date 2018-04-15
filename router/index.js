'use strict';
module.exports = function(app) {
   const express = require('express');
   const router = require('express-promise-router')();
   const passport = require('passport');
   const passportConf = require('../passport');

   const { validateBody, schemas } = require('../helpers/routeHelpers');
   const UsersController = require('../controllers/users');
   const passportSignIn = passport.authenticate('local', { session: false });
   const passportJWT = passport.authenticate('jwt', { session: false });

   const mongoose = require('mongoose');
   // const User = mongoose.model('Users');
   const Blog_use = require('../models/blog_categories');
   const Comment_use = require('../models/comment');
   const Post_use = require('../models/posts');
   const Post = mongoose.model('posts');
   const Comment = mongoose.model('comments');
   const jwt = require('jsonwebtoken');
   // Controller 
   const User = require('../controllers/users');
   const cors = require('cors')
   app.use(cors());

   app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
   });
   app.route('/singup')
   .post(validateBody(schemas.authSchema), UsersController.signUp);
   app.route('/signin')
   .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

   app.route('/oauth/google')
   .post(passport.authenticate('googleToken', { session: false }), UsersController.googleOAuth);

   app.route('/oauth/facebook')
   .post(passport.authenticate('facebookToken', { session: false }), UsersController.facebookOAuth);

   app.route('/secret')
   .get(passportJWT, UsersController.secret);

   app.route('/users')
   .get(UsersController.find_all);
   // app.post('/signup', function(req, res) {
   //    bcrypt.hash(req.body.password, 10, function(err, hash){
   //       if(err) {
   //          return res.status(500).json({
   //             error: err
   //          });
   //       }
   //       else {

   //          const newUser = User({
   //             _id: new  mongoose.Types.ObjectId(),
   //             name: req.body.name,
   //             email: req.body.email,
   //             password: hash,
   //             token: null
   //          });

   //          newUser.save().then(function(result) {
   //             res.status(200).json({
   //                success: 'success',
   //                data: result
   //             });
   //          }).catch(error => {
   //             res.status(500).json({
   //                error: err
   //             });
   //          });
   //       }
   //    });
   // });

   // app.post('/signin', (req, res) => {
   //    User.findOne({email: req.body.email})
   //    .exec()
   //    .then(function(user) {
   //       bcrypt.compare(req.body.password, user.password, function(err, result){
   //          if(err) {
   //             return res.status(401).json({
   //                failed: 'Unauthorized Access'
   //             });
   //          }
   //          if(result) {
   //             const JWTToken = jwt.sign({
   //              email: user.email,
   //              _id: user._id
   //           },
   //           'secret',
   //           {
   //             expiresIn: '2h'
   //          });
   //             return res.status(200).json({
   //                success: 'success',
   //                token: JWTToken
   //             });
   //          }
   //          return res.status(401).json({
   //             failed: 'Unauthorized Access'
   //          });
   //       });
   //    })
   //    .catch(error => {
   //       res.status(500).json({
   //          error: error
   //       });
   //    });;
   // });
   
   
   app.post('/post', (req,res) => {
      var new_post = new Post(req.body);
      new_post.save(function(err, post) {
         if (err){
            res.send(err);
         }
         res.json(post);
      });
   });

   app.get('/posts',(req, res) => {
      Post.find({},function(err, post) {
         if(err) {
            res.send(err);
         }
         
         res.json(post);
      })
   });

   app.get('/post/:postId', (req, res) => {
      // res.json(postId);
      Post.findById(req.params.postId, function(err, postid) {
         if (err) {
            res.send(err);
         }
         res.json(postid);
      });
   });

   app.post('/comment', (req, res) => {
      var new_comment = new Comment(req.body);
      new_comment.save(function(err, comment) {
         if (err){
            res.send(err);
         }
         res.json(comment);
      });
   });

   app.get('/comment/:commentId', (req, res) => {
      Comment.findById(req.params.commentId, function(err, commentid) {
         if (err) {
            res.send(err);
         }
         res.json(commentid);
      });
   });

   app.get('/commentallposts/:commentpostId', (req, res) => {
      // console.log(req.params.commentpostId);
      Comment.find({ "post_id":req.params.commentpostId } , function(err, commentpostId) {
         if(err) {
            res.send(err);
         }
         res.json(commentpostId);
      });
   });

   app.get('/comments',(req,res) => {
      Comment.find({},function(err, comment) {
         if(err) {
            res.send(err);
         }
         res.json(comment);
      })
   });
}