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

const productsModule = require('./routes/products.js');
const usersModule = require('./routes/users.js');

app.use(productsModule);
app.use(usersModule);

app.get('/', function(req, res)
{
    res.redirect('/login');
});

app.get('/add', function(req, res)
{
    res.sendFile(myPath + 'index.html', function (err)
    {

    });

});

app.post('/add', function(req, res)
{
    MongoClient.connect(url, function(err, db) {
        
        var collection = db.collection('products');

         collection.insert(req.body, function(err, data) {
        
            res.redirect('/browse');
            db.close();
        });
    });
})

app.get('/delete', function(req, res)
{
    res.sendFile(myPath + 'delete.html', function (err)
    {

    });
});

app.get('/browse', function(req,res)
{
    res.sendFile(myPath + 'browse.html', function (err)
    {

    });
});

app.get('/login', function (req, res)
{
    res.sendFile(myPath + 'login.html', function (err)
    {

    });
})

app.post('/login', function (req, res)
{
    console.log("Entered Username: " + req.body.username);
    console.log("Entered Password: " + req.body.password);

    MongoClient.connect(url, function(err, db)
    {
        if (err)
        {
            console.log("Problem med mongoDB");
        }
        else
        {
            var collection = db.collection('users');
            

            collection.find({}).toArray(function(err, users)
            {
                for (var i = 0; i < users.length; i++)
                {
                    if (JSON.stringify(users[i].username) === (JSON.stringify(req.body.username)) &&
                     JSON.stringify(users[i].password) === (JSON.stringify(req.body.password)))
                    {
                        console.log("username and password match found");
                        db.close;
                        res.redirect('/browse');
                        return;
                    }
                }
                console.log("username and password match NOT found");
                db.close;
                res.redirect('/');
                return;
            });
            
        } 
    });
});

app.get('/SignUp', function (req,res)
{
    res.sendFile(myPath + 'signUp.html', function (err)
    {

    });
});

app.listen(process.env.PORT || 5000);