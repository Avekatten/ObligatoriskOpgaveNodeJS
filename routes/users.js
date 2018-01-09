const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var path = require('path');
const myPath = __dirname + '/views/';

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://AndreasDB:zaq123@gettingstarted-shard-00-00-ow3hm.mongodb.net:27017,gettingstarted-shard-00-01-ow3hm.mongodb.net:27017,gettingstarted-shard-00-02-ow3hm.mongodb.net:27017/zalandodummy?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/users', function(req, res)
{
    MongoClient.connect(url, function(err, db) {
        
        var collection = db.collection('users');

        collection.find({}).toArray(function(err, data)
        {
            res.json(data);
            db.close();
        });
    });
});

app.post('/users', function(req, res)
{
    MongoClient.connect(url, function(err, db)
    {
        var collection = db.collection('users');

         collection.insert(req.body, function(err, data)
        {
        
            res.redirect('/login');
            db.close();
        });
    });
})

module.exports = app;