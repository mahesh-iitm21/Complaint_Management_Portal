
const development ={
    
    smtp:{
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'b21100@students.iitmandi.ac.in', // generated ethereal user
            pass: '' // generated ethereal password
        }
    },
   

}

module.exports = development;