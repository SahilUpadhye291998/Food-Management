const mongoose = require('mongoose');

let User = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNum: {
    type: String,
    required: true,
  },
  secret: {
    //password which will be stored in database
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  typeOf: {
    type: String,
    required: true,
  },
  customerSecret: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = User = mongoose.model('User', User);
