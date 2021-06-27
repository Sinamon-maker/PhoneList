const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  date: {type: Date, default: Date.now}
})

const Phone = mongoose.model('Phone', phoneSchema)

exports.Phone = Phone