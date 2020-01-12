// var express     =   require("express");
// var app         =   express();
// var bodyParser  =   require("body-parser");

// var router      =   express.Router();
// var mongoose    =   require("mongoose");
// mongoose.connect('mongodb://localhost:27017/mydb');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({"extended" : false}));

// router.get("/",function(req,res){
//     res.json({"error" : false,"message" : "Hello World"});
// });

// //route() will allow you to use same path for different HTTP operation.
// //So if you have same URL but with different HTTP OP such as POST,GET etc
// //Then use route() to remove redundant code.

// // router.route("/users")

// //     .post(function(req,res){
//   //  var db = new mongoOp();
//       var response = {};

//         router.post('/users', (req, res) => {
//           res.json({

//             body: req.body
//           }).save(function(err){
//             // save() will run insert() command of MongoDB.
//             // it will add new data in collection.
//                 if(err) {
//                     response = {"error" : true,"message" : "Error adding data"};
//                 } else {
//                     response = {"error" : false,"message" : "Data added"};
//                 }
//                 res.json(response);
//             });;
//         });

//    // });

// app.use('/',router);

// app.listen(3000);
// console.log("Listening to PORT 3000");
// var express = require('express');
// var path = require('path');
// var bodyParser = require('body-parser');

// var app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.resolve(__dirname, 'public')));

// app.post('/users', function (req, res) {
//     dbConn.then(function(db) {
// console.log("hjfhj"+req.body);
//         db.collection('userlogins').insertOne(req.body);
//     });
//     res.send('Data received:\n' + JSON.stringify(req.body));
// });
// app.get('/users',  function(req, res) {
//   dbConn.then(function(db) {
//       db.collection('userlogins').find({}).toArray().then(function(feedbacks) {
//           res.status(200).json(feedbacks);
//       });
//   });});
// app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );
// console.log("Listening to PORT 3000");
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var db;
var mongodb = require('mongodb');

var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017/mydb');

//Establish Connection
MongoClient.connect('mongodb://localhost:27017/mydb', function (err, database) {
   if (err)
   	throw err
   else
   {
	db = database;
	console.log('Connected to MongoDB');
	//Start app only after connection is ready
	app.listen(3000);
   }
 });

app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '/myfile.html'));
// });

app.post('/users', function(req, res) {
   // Insert JSON straight into MongoDB
  db.collection('employees').insert(req.body, function (err, result) {
      if (err)
         res.send('Error');
      else
        res.send('Success');

  });
});

app.get('/users',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('employees').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    });});
