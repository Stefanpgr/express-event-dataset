const express = require('express')
const { config } = require('dotenv')
const { log } = require('debug')
const {connectMongo, Record} = require('./config/db')
const recordRoutes = require('./components/records/recordRoutes')
const ResMsg = require('./utils')


config()
const app = express()

connectMongo()

app.use(express.json())

app.get('/', (req, res) => ResMsg(res, 200, 0, 'Welcome, Getir :)'))

app.use(recordRoutes)


app.use((req, res, next) => {
    const error = new Error('Your request could not be found')
    error.status = 404
    next(error)
})
  
  // eslint-disable-next-line no-unused-vars
app.use((error, req, res, _next) => {
    const { message } = error
   return ResMsg(res, error.status, 1, message)
   
})

const port = process.env.PORT || 4000
app.listen(port, () => log('app started at port', port))

  module.exports = app;