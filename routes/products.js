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


app.get('/products', function(req, res)
{
    MongoClient.connect(url, function(err, db) {
        
        var collection = db.collection('products');

        collection.find({}).toArray(function(err, data) {
            
            res.json(data);
            db.close();
        });
    });
});

app.get('/products/:id', function (req, res)
{
    MongoClient.connect(url, function (err, db) {
    var col = db.collection('products');

    col.findOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
        res.json(result);
    })
    db.close();
    });
});

app.post('/products', function(req, res)
{
    MongoClient.connect(url, function(err, db)
    {
        var collection = db.collection('products');

        collection.deleteOne(req.body, function(err, obj)
        {
            if (err) throw err
            console.log("Deleted product");
            db.close;
            res.redirect('/browse');
        })
    });
});


app.delete('/products/:id', function (req, res)
{

    MongoClient.connect(url, function (err, db)
    {
        var col = db.collection('products');

        col.deleteOne({ '_id': ObjectId(req.params.id) }, function (err, result)
        {
            res.status(204);
            res.json();

        });

        db.close();
    });
});

module.exports = app;