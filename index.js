// Base app
var express = require("express");
var app = express();

// For post call
var bodyParser = require('body-parser');
// For session
var session = require('express-session');

// For db
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session); // for storing session in db

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
   console.log("connected to mongo at localhost");
});

// session implementation (must be first on the list)
app.use(session({
    secret: 'work hard', // anything is fine
    resave: true,
    saveUninitialized: false
    // don't use below if you want session in memory(for development)
    , store: new MongoStore({
        mongooseConnection: db
    })
}));

// serve static files
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// 404
app.use(function(req,res,next){
   var err = new Error('File not found');
    err.statusCode = 404;
    next(err);
});

// 500
app.use(function(err, req, res, next){
    res.status(err.statusCode || 500);
    res.json(500,{
        message: err.message,
        error: {}
    });
});

app.listen(3000, function() {
    console.log("Express app listening port 3000");
});


// todo: route still falls through to 404/500 even though it is a success call