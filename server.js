var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

function formatDate(date) {
  var months = ["January", "February", "March", "April", "May",  "June", "July", "August", "September", "October", "November", "December"];
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

app.get('/:time', function (req, res) {
  if (req.params.time) {
    var intTime = parseInt(req.params.time);
    if (intTime || req.params.time == "0") {
      var date = new Date(intTime * 1000);
    } else {
      var date = new Date(req.params.time);
    }
    if (date == "Invalid Date") {
      res.send('{"unix": null, "natural": null}');
    } else {
      res.send('{"unix": ' + date.getTime() / 1000 + ', "natural": "' + formatDate(date) + '"}');
    }
  } else {
    res.send('{"unix": null, "natural": null}');
  }
});

app.get('/whoami', function (req, res) {
  var ip = req.connection.remoteAddress;
  var lang = req.headers["accept-language"];
  var software = req.headers["user-agent"];
  res.send('{"ip_address": "' + ip + '", "software": "' + software + '", "language": "' + lang + '"}');
});

app.get('/', function (req, res) {
  res.send('<h1>Timestamp Microservice</h1><hr /><p>Try to call <a href="/December%2010,%202016">/December%2010,%202016</a> or <a href="/1481328000">/1481328000</a> to test the microservice.</p>')
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
