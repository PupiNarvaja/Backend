const twilio = require("twilio")
const { TWILIO_SID, TWILIO_AUTH } = require("../config")

class WppSender {
    constructor() {
        this.client = twilio(TWILIO_SID, TWILIO_AUTH)
    }

    async sendWhatsapp(phone) {
        await this.client.messages.create({
            body: "Your purchase is on the way!😎\n It will arrive in a period of 5 to 7 business days.🔥",
            from: "whatsapp:+14155238886",
            to: `whatsapp:+${phone}`
        })
    }
}

module.exports = new WppSender()