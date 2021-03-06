var server,
    ip = "192.168.11.3",
    port = 8000,
    http = require('https'),
    fs = require("fs"),
    qs = require('querystring'),
    socket = require('socket.io'),
    folderPath = "static",
    url = require('url'),
    path,
    filePath,
    encode = "utf8";

var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};

server = http.createServer(options,function(req, res) {
    path = url.parse(req.url);
    filePath = folderPath + path.pathname + ".html";

    fs.readFile(filePath, encode, function(err, file) {
        if (err) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write("<h1>404</h1>");
            res.end();
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(file);    
        res.end();
    });
    if(req.method=='POST') {
            var body='';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end',function(){
                var POST =  qs.parse(body);
                console.log(POST);
            });
    }
    else if(req.method=='GET') {
        var url_parts = url.parse(req.url,true);
        console.log(url_parts.query);
    }
});

server.listen(port, ip);
console.log("Server running at http://" + ip + ":" + port);







