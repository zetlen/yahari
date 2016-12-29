const fs = require('fs')
const http = require('http')
const static = require('node-static')

const file = new static.Server('./dist')
const port = 3030

http.createServer((req, res) => {
  req
    .addListener('end', () => file.serve(req, res))
    .resume()
})
  .listen(port)

console.log(`listening on port ${port}...`)
