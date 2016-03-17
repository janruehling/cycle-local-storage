var compression = require('compression')
var express = require('express')
var app = express()

// var oneDay = 86400000

app.use(compression())

app.use(express.static(__dirname + '/dist'))

app.listen(process.env.PORT || 5000)
