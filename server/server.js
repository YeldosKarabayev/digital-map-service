
require("dotenv").config()

const express = require('express')
const app = express()
const path = require('path')
//const { logger } = require('./client/middleware/logger')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

//app.use(logger)

console.log(process.env.NODE_ENV)

connectDB()

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'build')))

app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
      res.sendFile(path.join(__dirname,'build', '404.html'))
  } else if (req.accepts('json')) {
      res.json({ message: '404 Not Found' })
  } else {
      res.type('txt').send('404 Not Found')
  }
})

mongoose.connection.once('open', () => {
  console.log('База данных подключен!')
  app.listen(PORT, '0.0.0.0', () => console.log(`Сервер запущен на порту ${PORT} 🚀`))
})

mongoose.connection.on('error', err => {
  console.log(err)
})










