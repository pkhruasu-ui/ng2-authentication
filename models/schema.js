var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type : String,
        required: true
    },
    passwordConf: {
        type: String,   //todo: what is this?
        required: true
    }
});

// authenticate user
UserSchema.statics.authenticate = function( email, password, callback){
    User.findOne({ email: email})
        .exec(function(err, user){  // error for w/e reason
            if(err){
                return callback(err)
            }else if(!user){    // user not found
                var error = new Error("User not found.");
                error.statusCode = 401;
                return error;
            }
            // console.log(7.1, err, user);
            // pass: found one, user bcryot to compare
            // user.password is in hash form
            bcrypt.compare(password,user.password,function(err, result){
                // console.log(7.2, err, result);
                if(result === true){
                    return callback(null, user);
                }else {
                    return callback();
                }
            })

        })
};

// for createing new user
UserSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err,hash){
        if(err){
            return next(err);
        }

        user.password = hash;
        next();
    })
});

var User = mongoose.model('User',UserSchema, 'users');
module.exports = User;
