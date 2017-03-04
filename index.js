var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("We are connected");
    db.createCollection("test",function(err,collection){console.log(collection)})
      var collection = db.collection('test');
      collection.insert({"sucess":true})
  }
  else{
    console.log(err);
  }
});


app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/do', function(req,res,next){
    res.send("dodo")
})

app.get('/try', function(req,res,next){
  MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("We are connected");
      var collection = db.collection('test');
      collection.findOne({},function(err,item){res.send(item)});

  }
  else{
    console.log(err);
  }
});
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
