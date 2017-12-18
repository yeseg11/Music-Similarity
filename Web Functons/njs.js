//write to file
var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {

    var adr = 'https://musicbrainz.org/ws/2/artist?query=madonna&fmt=json';
    var q = url.parse(adr, true);
    var qdata = q.query;


    fs.writeFile(qdata.query+'.txt', q.toString(), function (err) {
        if (err) throw err;
        console.log('Saved!');
        res.writeHead(200, {'Content-Type': 'text/html'});
        //res.write(data);
        res.end();
    });
}).listen(8080);