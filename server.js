var express = require('express');
var app = express();

function formatDate(date) {
  var months = ["January", "February", "March", "April", "May",  "June", "July", "August", "September", "October", "November", "December"];
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

app.get('/:time', function (req, res) {
  if (req.params.time) {
    var date = new Date(req.params.time);
    if (date == "Invalid Date") {
      res.send('{"unix": null, "natural": null}');
    } else {
      res.send('{"unix": ' + date.getTime() / 1000 + ', "natural": "' + formatDate(date) + '"}');
    }
  } else {
    res.send('Hello World!');
  }
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
