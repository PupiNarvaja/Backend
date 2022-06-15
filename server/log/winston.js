const winston = require("winston")
const { combine, printf, timestamp, colorize } = winston.format
// [${info.timestamp}] - info... No lo uso porque pm2 ya incluye timestamp.

const myFormat = printf((info) => `${info.level}: ${info.message}`)

const logger = winston.createLogger({
    level: "debug",
    transports: [
        new winston.transports.Console({
            level: "verbose",
            format: combine(colorize(), timestamp(), myFormat)
        }),
        new winston.transports.File({
            filename: "./logs/winston.app.log",
            level: "info",
            format: combine(timestamp(), myFormat)
        })
    ]
})

module.exports = logger