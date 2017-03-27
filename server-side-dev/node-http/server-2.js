var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req, res){
	console.log('Request for ' + req.url + ' by method ' + req.method);
	if (req.method == 'GET'){
		var fileUrl = '';
		if (req.url == '/'){
			fileUrl = '/index.html';
		}
		else{
			fileUrl = req.url;
		}
		var filePath = path.resolve('./public\\' + fileUrl);
		var fileExt = path.extname(filePath);
		if (fileExt == '.html'){
			fs.exists(filePath, function(exists){
				if (!exists){
					res.writeHead(404, {'Content-Type': 'text/html'});
					res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found. ' + filePath + '</h1></body></html>');
					return;
				}
				res.writeHead(200, {'Content-Type': 'text/html'});
				fs.createReadStream(filePath).pipe(res);
			});
		}
		else{
			res.writeHead(403, {'Content-Type': 'text/html'});
			res.end('<html><body><h1>Error 403: you don´t have permission to access ' + fileUrl + ' - ' + fileExt + '</h1></body></html>');
		}
	}
	else{
		res.writeHead(405, {'Content-Type': 'text/html'});
		res.end('<html><body><h1>Error 405: wrong HTTP verb.</h1></body></html>');
	}
});

server.listen(port, hostname, function(){
	console.log(`server running at http://${hostname}:${port}/`);
});

