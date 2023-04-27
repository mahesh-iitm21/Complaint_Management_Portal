const complaint = require('../models/complaint');
const user = require('../models/user');
//print cookies
// console.log(req.cookies)
//change cookie
// res.cookie('key'.'value')

module.exports.profile = function (req, res) {
    user.find({}).populate('complaint').exec(function (err, user) {

        return res.render('profile', {
            title: "Profile",
            users: user
        })
    }
    )
}
module.exports.form = function (req, res) {

    return res.render('form', {
        title: 'Form'
    });
}
module.exports.contact = function (req, res) {

    return res.render('contacts', {
        title: 'Contacts'
    });
}


module.exports.homepage = function (req, res) {
    user.find({}).populate('complaint').exec(function (err, user) {

        return res.render('homepage', {
            title: "Home",
            users: user
        })
    }
    )
}

module.exports.myComp = function (req, res) {

    user.find({}).populate('complaint').exec(function (err, user) {

        return res.render('myComp', {
            title: "MyComplaints",
            users: user
        })
    }
    )
}

module.exports.register = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/homepage');
    }
    return res.render('register', {
        title: 'Sign Up'
    });
}

module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        if (req.user.type == "user") {
            return res.redirect('/users/homepage');
        }
    }
    else {
        return res.render('login', {
            title: 'Sign In'
        });
    }
    return res.render('login', {
        title: 'Sign In'
    });
}

//get the sign up data 

module.exports.create = function (req, res) {
    user.create(req.body, function (err, user) {

        return res.redirect("/users/login")
    })
}
// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/users/homepage');
}

module.exports.destroySession = function (req, res) {
    //req.logout() is used for logout
    req.logout(function (err) {
        if (err) { return next(err); }
    });
    return res.redirect('/');
}