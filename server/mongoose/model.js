const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  }
})

const Phone = mongoose.model('Phone', phoneSchema)

exports.Phone = Phone