// Modo CLUSTER
module.exports = {
  apps: [
    {
      name: "Server cluster",
      script: "./server/server.js",
      args: "8080",
      instances: "max",
      exec_mode: "cluster"
    },
  ]
}
