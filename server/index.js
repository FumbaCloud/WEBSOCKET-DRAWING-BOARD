const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()

const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5000
const FILESFOLDER = process.env.FILESFOLDER || 'files'

app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {
  ws.on('message', message => {

    message = JSON.parse(message)

    switch(message.method) {
      case 'connection':
        connectionHandler(ws, message)
        break
      case 'draw':
        broadcastConnection(ws, message)
        break
    }
  })
})

app.post('/image', (req, res) => {
  try {
    const data = req.body.img.replace(`data:image/png;base64,`, '')
    fs.writeFileSync(path.resolve(__dirname, FILESFOLDER, `${req.query.id}.jpg`), data, 'base64')
    return res.status(200).json({message: "Downloaded"})
  } catch (error) {
    console.log(error)
    return res.status(500).json('error')
  }
})

app.get('/image', (req, res) => {
  try {
    if (fs.existsSync(path.resolve(__dirname, FILESFOLDER, `${req.query.id}.jpg`))) {
      const file = fs.readFileSync(path.resolve(__dirname, FILESFOLDER, `${req.query.id}.jpg`))
      const data = `data:image/png;base64,` + file.toString('base64')
      res.json(data)
    } else {
      const data = ''
      fs.writeFileSync(path.resolve(__dirname, FILESFOLDER, `${req.query.id}.jpg`), data, 'base64')
      return res.status(200).json({message: "Downloaded"})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json('error')
  }
})

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))

const connectionHandler = (ws, message) => {
  ws.id = message.id
  broadcastConnection(ws, message)
}

const broadcastConnection = (ws, message) => {
  aWss.clients.forEach(client => {
    if(client.id === message.id) {
      client.send(JSON.stringify(message))
    }
  })
}
