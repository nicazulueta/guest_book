const http = require('http')
const fs = require('fs')
const qs = require('querystring')

let names = [];
fs.readFile('./guests.txt', (err, data) => {
  names = (data.toString().split('|'))
  console.log(names)
})

const server = http.createServer((res, req) => {
  if (req.url === '/') {
  if (req.method === 'GET') {
  res.write(`<html><head></head><body><h1>Guest Book</h1>
  <ul>${names.map(name => `<li>${name}</li>`)}</ul>
  </body></html>`)
  res.end();
  } else {
    res.write('hello')
  }
  }
}
)

server.listen(3000)

// const http = require('http');

// const server = http.createServer(function(req, res) {
//   res.write('Hello World!'); // or, try sending a string containing HTML syntax instead…
//   res.end();
// });
// server.listen(3000);
