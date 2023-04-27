const complaint = require('../models/complaint');
const admin = require('../models/admin');

module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        if (req.user.type == "admin") {
            return res.redirect('/admin/admin_homepage');
        }
    }
    else {
        return res.render('admin_login', {
            title: 'Sign In'
        });
    }
    return res.render('admin_login', {
        title: 'Sign In'
    });
}


// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/admin/admin_homepage');
}

module.exports.home = function (req, res) {

    complaint.find({}, function (err, complaint) {

        return res.render('admin_homepage', {
            title: "Home",
            complaints: complaint
        });
    });
}

module.exports.destroySession = function (req, res) {
    //req.logout() is used for logout
    req.logout(function (err) {
        if (err) { return next(err); }
    });
    return res.redirect('/');
}
module.exports.update = function (req, res) {

    complaint.findByIdAndUpdate(req.params.id, req.body, function (err, complaint) {
        return res.redirect('back');
    })



}