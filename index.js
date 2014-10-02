var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('<html><body><h1>Hello World</h1></body></html>');
});

app.listen(app.get('port'), function() {
  console.log("PKProjectServer is running at localhost:" + app.get('port'))
})
