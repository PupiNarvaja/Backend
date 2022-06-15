// Modo CLUSTER
module.exports = {
  apps: [
    {
      name: "Server cluster",
      script: "app.js",
      args: "8080", 
      instances: "max",
      exec_mode: "cluster"
    },
  ]
}
