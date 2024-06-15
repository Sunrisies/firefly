
const http = require('http');

const server = http.createServer((req, res) => {
  // 现在跨域

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('X-Powered-By', 'Node.js');

  setTimeout(() => {
    res.end('Hello World\n');
  },10000)
});

const port = 4000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});