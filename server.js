const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const PORT = process.env.PORT || 3000

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/newsComplainer'

const app = express()

app.use(logger('dev'))

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  key: 'user_sid',
  secret: 'somerandomstuff',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}))

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next()
})

require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)

mongoose.Promise = Promise
mongoose.connect(MONGODB_URI)

app.listen(PORT, function () {
  console.log('App running on port' + PORT + '!')
})