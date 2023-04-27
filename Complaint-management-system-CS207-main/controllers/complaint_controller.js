const complaint = require("../models/complaint");
const user = require("../models/user");
const compmail = require('../mailer/comp_mailer')
//we are using req.body.post bcoz we have taken post as an hidden input while making the complaint
module.exports.create = function (req, res) {
    console.log(req.body.resp)
    user.findById(req.user._id, function (err, user) {
        if (user) {
            complaint.create({
                name: req.body.name,
                roll: req.body.roll,
                room: req.body.room,
                desc: req.body.desc,
                hostel: req.body.hostel,
                campus: req.body.campus,
                category: req.body.category,
                block: req.body.block,
                subject: req.body.subject,
                status: req.body.status,
                resp: req.body.resp,
                user: req.user._id
            }, function (err, complaint) {

                if (err) { console.log("error in creating the complaint", err); return; }
                //updating the post object using .push and .save
                user.complaint.push(complaint);
                user.save();
                compmail.newComp(complaint);

                return res.redirect('/users/myComp');
            });
        }
    })


}


