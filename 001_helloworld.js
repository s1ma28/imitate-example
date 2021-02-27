// お手本にしたもの：https://github.com/omatoro/NodeSample/blob/master/001/001_helloworld.js

var http = require('http');
http.createServer(function (req, res){
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("hello, world!\n");
}).listen(8080, "localhost")