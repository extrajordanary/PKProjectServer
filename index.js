var express = require('express'),
	mongoskin = require('mongoskin'),
	bodyParser = require('body-parser'),
    path = require('path')

var app = express()
app.set('port', (process.env.PORT || 5000))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json({
  extended: true
}))

var db = mongoskin.db('mongodb://heroku:KuH371EeJU64VIwZ6ztw45kUNquLcDfod9aKcbpxIy5S9kSfnqL8cOFZU78OENRaWcRE7y_QW4VDudJ2TjmJPQ@linus.mongohq.com:10079/app30263650', {safe:true})

app.param('collectionName', function(req, res, next, collectionName){
  req.collection = db.collection(collectionName)
  return next()
})

app.get('/', function(req, res) {
  res.send('please select a collection, e.g., /collections/messages')
})

app.get('/collections/:collectionName', function(req, res, next) {
  req.collection.find({} ,{limit:50, sort: [['_id',-1]]}).toArray(function(e, results){
    if (e) return next(e)
    res.send(results)
	 //  else { 
	 //      if (req.accepts('html')) { 
	 //          res.render('data',{objects: results, collection: req.params.collection})
	 //      } else {
	 //      res.set('Content-Type','application/json')
	 //          res.send(results)
	 //      }
	 // }
  })
})

app.post('/collections/:collectionName', function(req, res, next) {
  req.collection.insert(req.body, {}, function(e, results){
    if (e) return next(e)
    res.send(results)
  })
})

app.get('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.findById(req.params.id, function(e, result){
    if (e) return next(e)
    res.send(result)
  })
})

app.put('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(e, result){
    if (e) return next(e)
    res.send((result===1)?{msg:'success'}:{msg:'error'})
  })
})

app.delete('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.removeById(req.params.id, function(e, result){
    if (e) return next(e)
    res.send((result===1)?{msg:'success'}:{msg:'error'})
  })
})

app.listen(app.get('port'), function() {
  console.log("PKProjectServer is running at localhost:" + app.get('port'))
})