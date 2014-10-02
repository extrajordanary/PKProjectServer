var express = require('express')
	, http = require('http')
	, mongo = require('mongodb')
	, path = require('path')

var app = express()
app.set('port', (process.env.PORT || 5000))
app.use(express.static(path.join(__dirname, 'public')))

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';

mongo.Db.connect(mongoUri, function (err, db) {
  // db.collection('mydocs', function(er, collection) {
  //   collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
  //   })
  // })
})

app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('<html><body><h1>Hello World</h1></body></html>')
})

app.use(function (request, response) {
	response.render('404', {url:request.url})
})

app.listen(app.get('port'), function() {
  console.log("PKProjectServer is running at localhost:" + app.get('port'))
})
