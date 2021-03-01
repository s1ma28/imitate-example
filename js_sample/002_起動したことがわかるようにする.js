// お手本にしたもの: https://github.com/omatoro/NodeSample/blob/master/002/002_%E8%B5%B7%E5%8B%95%E3%81%97%E3%81%9F%E3%81%93%E3%81%A8%E3%81%8B%E3%82%99%E5%88%86%E3%81%8B%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B.js

var http = require('http');
http.createServer(function (req, res){
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("hello, world!\n");
}).listen(8080, "localhost", function() {
  console.log("Server running at http://127.0.0.1:8080");
  console.log('サーバを終了するには、[Ctrl + c]');
});
