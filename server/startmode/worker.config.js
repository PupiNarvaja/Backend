// Modo fork.
module.exports = { 
    apps: [//Array de nuestrsa aplicaciones. Cada obj es una app.
        {  
            name: "Server 1",
            script: "app.js",
            args: "8081"
        },
        {
            name: "Server 2",
            script: "app.js",
            args: "8082"
        },
        {
            name: "Server 3",
            script: "app.js",
            args: "8083"
        }
    ]
}