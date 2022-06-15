//INNECESARIO SI USO PM2, NO?

const cluster = require("cluster")
const CPUs = require("os").cpus().length
const app = require("./app") // En app debemos retornar y expoirtarla module.exports.
const { PORT } = require("./config")
const isCluster = process.argv[2] === "cluster"

if (isCluster && cluster.isPrimary) {

    for (let i = 0; i < CPUs; i++) {
        cluster.fork()
    }
} else {
    app
        .then((server) => server.listen(PORT, () => console.log("🚀 Server online.")))
        .catch((error) => console.log(error))
}

 // Cluster: Proceso primario de node que controla todos los demas.
 //  Crea procesos hijo por cada cpu. Se ejecuta de vuelta el archiuvo.
 // Entonces ese hijo no es primario, por lo tanto, ejecta el listening.
 // Al ser 4 hijos, se ejecuta 4 veces.