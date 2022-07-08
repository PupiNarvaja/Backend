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

    async newRegister(newUser) {
        const template = `
            <h1 style="color: red;">A new user has registered.</h1>
            <h2>User's data:</h2>
            <ul>
                <li>id: ${newUser._id}</li>
                <li>Email: ${newUser.email}</li>
                <li>Name: ${newUser.firstname} ${newUser.lastname}</li>
                <li>Age: ${newUser.age}</li>
                <li>Address: ${newUser.address}</li>
                <li>Phone number: ${newUser.phone}</li>
            </ul>
            `
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