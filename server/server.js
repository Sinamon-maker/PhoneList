const mongoose = require('mongoose')
const {Phone} = require('./mongoose/model')
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost/phones', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'))


app.get('/', async (req,res)=>{
const phones = await Phone.find()
  res.send(phones)
})

app.post('/api/v1/phone', async (req, res) => {
  console.log(req.body)
  let newPhone = new Phone({phone: req.body.phone})
  newPhone = await newPhone.save()

  res.send(newPhone)
})

app.delete('/', async (req, res) => {
  Phone.deleteMany( function (err) {
    if (err) return console.log(err);
    console.log('Succeed deletion')
  });

  res.send({status: 'ok'})
})

const port = process.env.PORT || 8090
app.listen(port, () => console.log(`Listening on port ${port}...`))