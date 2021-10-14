var express =require('express');
var fs = require('fs');
var app = express();
const port = 3000;
//var http = require('http');
//var server = http.createServer(app);

app.get('/',function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('express01.html', function (err,data) {
        res.end(data);
    });
});

app.get('/hello/:name', function(req,res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Hello ' + req.params.name + '!'}));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
