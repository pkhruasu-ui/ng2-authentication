var express = require('express');
var router = express.Router();
var User = require('../models/schema.js');

// GET
router.get('/', function (req, res, next) {
    return res.sendFile(__dirname + '/security/index.html');
    // return res.send('working');
});

router.post('/login', function (req, res, next) {
    var err;
    // confirm the user typed same password twice
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        // user sign up for the site
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        };
        //use schema.create to insert data into db
        User.create(userData, function (err, user) {
            if (err) {
                // console.log(3, err);
                return next(err);
                // return res.status(500).json(err.toJSON());
            } else {
                // console.log(4);
                // return res.redirect('/profile');
                return res.status(200).json({status: 'signup ok'});
            }
        })
    } else if (req.body.logemail && req.body.logpassword) {
        // user login normally, authenticate first
        // console.log(6, req.body);
        User.authenticate(req.body.logemail, req.body.logpassword, function (err, user) {
            if (err || !user) {
                // console.log(7,err);
                err = new Error('Wrong email or password');
                err.status = 400;
                return next(err);
            } else {
                // console.log(8,user);
                req.session.userId = user.id;
                // return res.redirect('/profile');
                return res.status(200).json({status: 'login ok'});
            }
        })
    } else {
        err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
});


router.get('/session', function(req,res,next){
    return res.status(200).json({ session: req.session});
});

router.get('/logout',function(req,res,next){
    if(req.session){
        // delete session object
        req.session.destroy(function(err){
            if(err){
                return next(err);
            } else {
                // return res.redirect('/');
                return res.status(200).json({status: 'log out ok'});

            }
        });
    }
});

router.get('/profile',requireLogin, function(req,res,next){
    return res.sendFile(__dirname + '/security/index.html');
});

function requireLogin(req,res,next){
    if(req.session && req.session.userId){
        return next();
    }else{
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
}

module.exports = router;