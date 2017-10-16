const path = require('path')
const server = require('./server')

var tiresias = server.init({
  rootDir: path.join(__dirname, 'src'),
  port: 9090
})

// cache views for production environment
tiresias.app.enabled('view cache')

server.start()
