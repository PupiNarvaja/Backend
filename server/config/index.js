// MongoDB
const SCHEMA = process.env.SCHEMA
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const HOSTNAME = process.env.HOSTNAME
const DATABASE = process.env.DATABASE
const OPTIONS = process.env.OPTIONS
const URI_CLOUD_CONNECTION = `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`

// Development/production envs 
const PORT = process.argv[2] || process.env.PORT
const NODE_ENV = process.env.NODE_ENV || "production"

// Email
GMAIL_ADDRESS = process.env.GMAIL_ADDRESS
GMAIL_PASSWORD = process.env.GMAIL_PASSWORD

// Twilio
TWILIO_SID = process.env.TWILIO_SID
TWILIO_AUTH = process.env.TWILIO_AUTH

// JWT
JWT_SECRET = process.env.JWT_SECRET

module.exports = {
    URI_CLOUD_CONNECTION,
    PORT,
    NODE_ENV,
    GMAIL_ADDRESS,
    GMAIL_PASSWORD,
    TWILIO_SID,
    TWILIO_AUTH,
    JWT_SECRET
}