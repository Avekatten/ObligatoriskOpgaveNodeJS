const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var path = require('path');
const myPath = __dirname + '/views/';

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = process.env.mongoDB;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

var productRouter = express.Router();


productRouter.route('/')
    .get(function(req, res)
    {
        MongoClient.connect(url, function(err, db)
        {
            if (err)
            {
                console.log("Couldn't connect to database!");
            }
            var collection = db.collection('products');
    
            collection.find({}).toArray(function(err, data)
            {
                res.status(200);
                res.json(data);
                db.close();
            });
        });
    })
    .post(function(req, res)
    {
        MongoClient.connect(url, function(err, db)
        {
            if (err)
            {
                console.log("Couldn't connect to database")
            }
            var collection = db.collection('products');
    
             collection.insert(req.body, function(err, data) 
             {
                 if (err)
                 {
                     res.status(404);
                 }
                res.status(201);
                res.redirect('/browse');
                db.close();
            });
        });
    });

productRouter.route('/:id')
    .get(function (req, res)
    {
        MongoClient.connect(url, function (err, db)
        {
            if (err)
            {
                console.log("Couldn't connect to database")
            }
            var col = db.collection('products');
        
            col.findOne({ '_id': ObjectId(req.params.id) }, function (err, result)
            {
                if (err)
                {
                    res.status(404);
                }
                res.status(200);
                res.json(result);
            })
            db.close();
        });
    })
    .delete(function (req, res)
    {
        MongoClient.connect(url, function (err, db)
        {
            if (err)
            {
                console.log("Couldn't connect to database")
            }
            var col = db.collection('products');

            col.deleteOne({ '_id': ObjectId(req.params.id) }, function (err, result)
            {
                if (err)
                {
                    res.status(404);
                }
                res.status(200);
                res.json();

            });
            db.close();
        });
    })
    .put(function (req, res)
    {
        MongoClient.connect(url, function (err, db)
        {
            if (err)
            {
                console.log("Couldn't connect to database")
            }
            var col = db.collection('products');

            col.updateOne({ '_id': ObjectId(req.params.id) }, {$set : req.body}, function(err, result)
            {
                if (err)
                {
                    res.status(404);
                }
                res.status(204);
                res.json();
            });
            db.close();
        });
    });

app.use('/products', productRouter);

module.exports = app;