/* 
    mail configuration 
*/
// dependencies
const nodemailer = require('nodemailer');
// authentication for gmail
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
// export transporter
module.exports = transporter