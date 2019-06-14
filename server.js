const http = require('http')
const fs = require('fs')
const qs = require('querystring')

let names = []


const server = http.createServer((req, res) => {

  if (req.url === '/') {
    if (req.method === 'GET') {
      fs.readFile('./guests.txt', (err, data) => {
        if (err) { console.log(error) }
        names = data.toString().split('|')
      })
      res.write(`<html><head></head><body><h1>Guest Book</h1>
  <ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>
  <form method='POST'><input name='name' type='text' /><button>Add Name</button></form>
  </body></html>`)
      res.end();
    } else {
      const data = []
      req.on('data', (chunk) => {data.push(chunk)});
      req.on('end', () => {
        const body = qs.parse(data.toString())
        names.push(body.name)
        console.log(names)
      })
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
