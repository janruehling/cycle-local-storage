var jsonServer = require('json-server')
var server = jsonServer.create()
server.use(jsonServer.defaults())

var fakeDb = require('./fakeDb')

// var router = jsonServer.router('db.json')
var router = jsonServer.router(fakeDb())
server.use(router)

server.listen(3000)
