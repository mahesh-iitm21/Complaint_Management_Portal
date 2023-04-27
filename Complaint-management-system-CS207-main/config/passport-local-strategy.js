const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

const admin = require('../models/admin');
const user = require('../models/user');


// authentication using passport
passport.use('user', new LocalStrategy({
    usernameField: 'roll_no'
},
    function (roll_no, password, done) {
        // find a user and establish the identity
        User.findOne({ roll_no: roll_no }, function (err, user) {
            if (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }


));
passport.use('admin', new LocalStrategy({
    usernameField: 'name'
},
    function (name, password, done) {
        // find a user and establish the identity
        admin.findOne({ name: name }, function (err, user) {
            if (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if (!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    admin.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        if (user) { return done(null, user); }
        else {
            User.findById(id, function (err, user) {
                if (err) done(err);
                done(null, user)
            })
        }


    });
});


//to display user data in views we will first check if the user is authenticated or not
//for that we will create a middleware isauthenticated
passport.checkAuthentication = function (req, res, next) {
    //if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {


        if (req.user.type == "user") {
            return next();
        }
        else { return res.redirect('/users/login'); }
    }
    //if the user is not signed in
    return res.redirect('/users/login');
}
passport.checkadmin = function (req, res, next) {
    //if the user is signed in, then pass on the request to the next function(controller's action)

    if (req.isAuthenticated()) {


        if (req.user.type == "admin") {
            return next();
        }
        else { return res.redirect('/admin/login'); }
    }
    //if the user is not signed in
    return res.redirect('/admin/login');

}

//now if the user is signed in pass on its info to locals
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;

    }

    next();
}

module.exports = passport;