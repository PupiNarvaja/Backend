// Modo fork.
module.exports = { 
    apps: [
        {  
            name: "Server 1",
            script: "./server/server.js",
            args: "8081"
        },
        {
            name: "Server 2",
            script: "./server/server.js",
            args: "8082"
        },
        {
            name: "Server 3",
            script: "./server/server.js",
            args: "8083"
        }
    ]
}