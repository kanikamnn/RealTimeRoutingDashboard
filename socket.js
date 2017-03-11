var express = require('express');
const http = require('http');
const unirest = require('unirest');
var app = express();
const WebSocket = require('ws');

const server = http.createServer(app);
var ws = new WebSocket.Server({server});

ws.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log('recieved: %s', message);
  });
  ws.on('close', function(){
    console.log("Closing Now...");
  });
  (function callback(){
    unirest.post("https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies")
      .header("X-Mashape-Key", "GErl5hDyOPmshrRvdM7DrWm0z1xcp1NgbXHjsnsFposEQ5ST5r")
      .header("Content-Type", "application/x-www-form-urlencoded")
      .header("Accept", "application/json")
      .end(function (result) {
        // console.log(result.status, result.headers, result.body);
        let parsedData = JSON.parse(result.body);
        ws.send(JSON.stringify(parsedData), function(error) {
          if (error != undefined) {
            console.log('Error: ', error);
            ws.close();
          } else {
            console.log(parsedData);
            setTimeout(callback, 1000);
          }
        });   // Canno take Object values, should be a serialized object like String...
        
    });
  })();
});

server.listen(3000, function () {
  console.log("Listening on %d", server.address().port);
});

