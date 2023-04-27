const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComp = (complaint) => {
    var maillist = [
         complaint.roll + "@students.iitmandi.ac.in",
        'harsh100pahwa@gmail.com'
      ];
    console.log(maillist);
    // let htmlString = nodeMailer.renderTemplate('mail.ejs');
    nodeMailer.transporter.sendMail({
        from: 'b21100@students.iitmandi.ac.in',
        to: maillist,
        subject: "New Complaint Published!",
        //TODO
        html: "<p>Complaint details <br>" + "<ul>"
            + "<li> Name: " + complaint.name + "</li>"
            + "<li> Roll No: " + complaint.roll + "</li>"
            + "<li> Room No: " + complaint.room + "</li>"
            + "<li> Hostel:" + complaint.campus + " -> " + complaint.block + " -> " + complaint.hostel + "</li>"
            + "<li> Category: " + complaint.category + "</li>"
            + "<li> Subject: " + complaint.subject + "</li>"
            + "<li> Description: " + complaint.desc + "</li>" +
            "</ul> Thank You</p>"
    },
        //info carries the info of the mail that has been sent
        (err, info) => {
            if (err) {
                console.log('Error in sending mail', err);
                return;
            }

            console.log('Message sent', info);
            return;
        });
}