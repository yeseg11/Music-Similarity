var http = require('http'),
    fs = require('fs'),
    url = require('url');
   // express = require('express');
   // var app = express();

//app.use('/js',express.static("js"));

var server = http.createServer(function (req,res) {

    var url_parts = url.parse(req.url, true);

    var body = '';
    if (url_parts.pathname == '/') {
        fs.readFile(__dirname + "/index.html", function (error, data) {
            fs.readFile(__dirname +"/js/body.js",function (err,bdata) {
                console.log("read body");
                return res.end(bdata);
            });
            fs.readFile(__dirname +"/js/getData.js",function(error,gdata){
                console.log("read getData");
                return res.end(gdata);
            });
            console.log('Serving the page index.html');
            return res.end(data);
        });

    }
});
server.listen(8080);
console.log('Server listenning at localhost:8080');