const nodemailer = require('nodemailer')
const config = require('../config/config')

const sendMail = async (email, subject, text) => {
    try {
        const smtp = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: true,
            service: "Gmail",
            auth: {
                user: config.EMAIL,
                pass: config.EMAIL_PASSWORD,
            },
        })

        await smtp.sendMail({
            from: config.EMAIL,
            to: email,
            subject: subject,
            text: text,
        })
    } catch (err) {
        console.log('mailerror', err)
    }
}
module.exports = sendMail
