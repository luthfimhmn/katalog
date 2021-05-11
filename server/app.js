const express = require('express')
const router = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(errorHandler)


module.exports = app