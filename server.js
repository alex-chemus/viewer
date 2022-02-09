const express = require('express')
const history = require('connect-history-api-fallback')
const parser = require('body-parser')
const fetch = require('node-fetch')
const sharp = require('sharp')

const app = express()
const PORT = process.env.PORT || 80

app.use(history())
app.use(express.static('dist'))
app.use(parser.json())

//global.Blob = Blob

app.get('/', (req, res) => {
  res.sendFile('./dist/index.html')
})

app.post('/api/get-img', (req, res) => {
  fetch(req.body.url)
    .then(response => response.blob())
    .then(blob => {
      res.type(blob.type)
      return blob.arrayBuffer()
    })
    .then(buffer => {
      return sharp(Buffer.from(buffer))
        .resize(250)
        .toBuffer()
    })
    .then(buffer => {
      //console.log('send buffer')
      res.send(Buffer.from(buffer))
    })
    .catch(err => {
      console.log(err)
      res.status(50)
      res.end()
    })
})

app.listen(PORT, () => {
  console.log('Server has been started')
})