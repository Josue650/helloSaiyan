require('dotenv').config()
// const pusher =
require('./config/database');
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan');
const PORT = process.env.PORT || 3001
const cors = require('cors')

const app = express()

app.use(express.json())// req.body
app.use((req, res, next) => {
    res.locals.data = {}
    // res.locals.pusher = pusher
    next()
})
app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico' )))
app.use(express.static(path.join(__dirname, 'build')))
app.use(cors())


// app.use(require('./config/checkToken'))

app.use('/api/users', require('./routes/api/users'))


app.use('/api/messages', require("./routes/api/messages"))
// const ensureLoggedIn = require('./config/ensureLoggedIn')
// app.use('/api/messages', ensureLoggedIn, require('./routes/api/messages'))

app.get('/', (req, res) => {
    res.json({'eureka': 'you have found it'})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`I am listening on ${PORT}`)
})
