const nodemailer = require("nodemailer")
const { GMAIL_ADDRESS, GMAIL_PASSWORD } = require("../config") 

class MailSender {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: GMAIL_ADDRESS,
                pass: GMAIL_PASSWORD
            }
        })
    }

    async send(template, email) {
        const mailOptions = {
            from: "Your purchases <no-reply@this.com",
            subject: "Your order in the store.",
            to: email,
            html: template
        }

        await this.transporter.sendMail(mailOptions)
    }

    async newRegister(template) {
        const mailOptions = {
            from: "This - New user.",
            subject: "New user registered.",
            to: GMAIL_ADDRESS,
            html: template
        }

        await this.transporter.sendMail(mailOptions)
    }
}

module.exports = new MailSender()