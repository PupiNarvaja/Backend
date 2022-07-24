const sendChatView = (req, res) => {
    return res.sendFile(`${__dirname}/views/index.html`)
}

module.exports = {
    sendChatView
}