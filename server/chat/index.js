module.exports = (socket, io) => {
    console.log("A user connected.")

    socket.on("chat", (msg) => {
        io.emit("chat", msg)
    })
}