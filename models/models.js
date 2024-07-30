const mongoose = require('mongoose');

const schema = mongoose.Schema

const postschema = new schema({
  time:{
    type: Date,
    default: Date.now
  },
  board:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  content:{
    type: String,
    required: true
  }, 
  replyid:{
    type: String,
    required: false
  }
})

module.exports = mongoose.model('model', postschema)