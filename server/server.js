const mongoose = require('mongoose')
const { Phone } = require('./mongoose/model')
const express = require('express')
const http = require('http')
var cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'))


app.get('/', async (req, res) => {
  const phones = await Phone.find().sort({date:-1}).select({phone: 1})
  res.send(phones)
})

app.post('/api/v1/phone', async (req, res) => {
  let newPhone = new Phone({ phone: req.body.phone })
  newPhone = await newPhone.save()

  res.send(newPhone)
})

app.delete('/', async (req, res) => {
 const result = await Phone.deleteMany()

  res.send({ status: 'ok' })
})

const port = process.env.PORT || 8090

const server = http.createServer(app)
const io = require('socket.io')(server, (http, { destroyUpgrade: false }))

let connections = []

io.on('connection', async (socket) => {
  const phones = await Phone.find().sort({ date: -1 }).select({ phone: 1 })

  const list = { type: 'RECEIVE_LIST', phones }
  io.emit('action', list)
  socket.on('action', async (data) => {

    let newPhone = new Phone({ phone: data.phone })
    newPhone = await newPhone.save()

    const newData = { type: data.type, phone: newPhone }
    io.sockets.emit('action', newData)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}...`))