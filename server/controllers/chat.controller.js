const path = require("path")

const sendChatView = (req, res) => {
    return res.sendFile(path.resolve(__dirname, "../views", "index.html"))
}

module.exports = {
    sendChatView
}