// お手本にしたもの: https://github.com/omatoro/NodeSample/blob/master/017/017_%E3%83%A9%E3%83%83%E3%82%AD%E3%83%BC%E3%83%8A%E3%83%B3%E3%83%8F%E3%82%99%E3%83%BC%E3%82%92%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%82%8C%E3%82%8B%E3%82%A2%E3%83%95%E3%82%9A%E3%83%AA.js

/* 
 * モジュール読込
 */
var http = require('http');
var querystring = require('querystring');
var setting = require('./999_param.js');

/*
 * HTMLデータ
 */
var HTML_HEAD = '\
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\
<html xmlns="http://www.w3.org/1999/xhtml">\
<head>\
    <meta http-equiv="Content-Type" content="text/html ;charset=UTF-8" />\
    <title>ラッキーナンバー</title>\
</head>\
';

var HTML_BODY = '\
<body>\
	<div>\
		<h1>ラッキーナンバー占い</h1>\
		<form method="post" action="/">\
			<div>\
				生年月日\
				<label><input type="text" name="year" />年</label>\
				<label><input type="text" name="month" />月</label>\
				<label><input type="text" name="day" />日</label>\
			</div>\
			<input type="submit" value="ラッキーナンバーは？" />\
		</form>\
	</div>\
</body>\
';
var HTML_FOOTER = '\
</html>\
';

/*
 * サーバの作成
 */
var server = http.createServer();

/* 
 * requestイベント受信時の処理（イベントハンドラ）を作成する
 */
server.on('request', function(req, res){
  // ルート以外のパスなら、404返す
  if (req.url !== "/") {
    res.writeHead(404, setting.HEADER);
    res.end('Error 404: Not Found.');
    return;
  }

  // GETメソッドなら入力用HTMLデータをクライアントに返す
  if (req.method === "GET"){
    res.writeHead(200, setting.HEADER);
    res.write(HTML_HEAD);
    res.write(HTML_BODY);
    res.write(HTML_FOOTER);
    res.end();
    return;
  }

  // POSTメソッドなら結果表示用HTMLデータを返す
  else if (req.method === "POST"){
    req.data = '';
    req.on('readable', function() {
      req.data += req.read();
    });
    req.on('end', function() {
      // 取得データを整形
      var query = querystring.parse(req.data);
      /* queryの中身例
      {
        year: "2000",
        month: "12",
        day: "24"
      }
      */

      // ラッキーナンバーを計算する）
      var luckyNumber = query.year * 10;

      var resultHtml = '\
        <body>\
          <div>\
            あなたのラッキーナンバーは... <em style="font-size: 30px">' + luckyNumber + '</em>  です！\
          </div>\
        </body>\
      '

      // 結果を表示
      res.writeHead(200, setting.HEADER);
      res.write(HTML_HEAD);
      res.write(resultHtml);
      res.write(HTML_FOOTER);
      res.end();
    });
    return;

  }

});

/* 
 * イベント待ち受け状態を開始
 */
server.listen(setting.PORT, setting.IP, setting.startServer);
