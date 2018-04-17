const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const router = express.Router();
const routes = require('./router');
const models = require('./models');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/socialTester');
} else {
  mongoose.connect('mongodb://socialnaq:atcool1150@ds231589.mlab.com:31589/social');
}
// Middlewares
// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

app.use(function(req, res) {
	res.status(404).send({url: req.originalUrl + ' not found'})
});

// app.listen(port, function(){
//    console.log('Server is running on Port',port);
// });

module.exports = app;