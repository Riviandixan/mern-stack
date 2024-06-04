const nodemailer = require('nodemailer');
const { gmail, password } = require('../../config');
const Mustache = require('mustache');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: "5466f48c5b4b45",
        pass: "91538add74e8be"
    },
});

const otpMail = async (email, data) => {
    try {
        let template = fs.readFileSync('app/views/email/otp.html', 'utf8');

        let message = {
            from: "noreply@yourdomain.com",
            to: email,
            subject: 'OTP for registation',
            html: Mustache.render(template, data)
        };

        return await transporter.sendMail(message);
    } catch (ex) {
        console.error('Error sending OTP email:', ex);
        throw new Error('Failed to send OTP email');
    }
}

module.exports =  { otpMail };