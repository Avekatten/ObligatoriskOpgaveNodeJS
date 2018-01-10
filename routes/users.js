const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var path = require('path');
const myPath = __dirname + '/views/';
var cors = require('cors');
app.use(cors());

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://AndreasDB:zaq123@gettingstarted-shard-00-00-ow3hm.mongodb.net:27017,gettingstarted-shard-00-01-ow3hm.mongodb.net:27017,gettingstarted-shard-00-02-ow3hm.mongodb.net:27017/zalandodummy?ssl=true&replicaSet=GettingStarted-shard-0&authSource=admin';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

var userRouter = express.Router();

userRouter.route('/')
    .get(function(req, res)
    {
        MongoClient.connect(url, function(err, db)
        {
            if (err)
            {
                console.log("Couldn't connect to database!");
            }
        
            var collection = db.collection('users');
    
            collection.find({}).toArray(function(err, data)
            {
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
                console.log("Couldn't connect to database!");
            }
            var collection = db.collection('users');

            collection.insert(req.body, function(err, data)
            {
                if (err)
                 {
                     res.status(404);
                 }
                res.redirect('/login');
                db.close();
            });
        });
    })

userRouter.route('/:id')
    .get(function (req, res)
    {
        MongoClient.connect(url, function (err, db)
        {
            if (err)
            {
                console.log("Couldn't connect to database!");
            }
            var col = db.collection('users');
        
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
                console.log("Couldn't connect to database!");
            }
            var col = db.collection('users');

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
                console.log("Couldn't connect to database!");
            }
            var col = db.collection('users');

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

app.use('/users', userRouter);

module.exports = app;