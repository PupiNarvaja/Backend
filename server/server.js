const cluster = require("cluster")
const CPUs = require("os").cpus().length
const app = require("./app")
const { PORT } = require("./config")
const isCluster = process.argv[2] === "cluster"
const logger = require('./log')

if (isCluster && cluster.isPrimary) {

    for (let i = 0; i < CPUs; i++) {
        cluster.fork()
    }
    
} else {
    app
        .then((server) => server.listen(PORT, () => logger.info("🚀 Server online.")))
        .catch((error) => logger.error(error))
}