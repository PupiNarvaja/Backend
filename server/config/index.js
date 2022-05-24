const SCHEMA = "mongodb+srv"
const USER = "Pupinarvaja"
const PASSWORD = "a8d!hZqqF5b.xEn"
const HOSTNAME = "cluster0.7qw8s.mongodb.net"
const DATABASE = "ecommerce"
const OPTIONS = "retryWrites=true&w=majority"

const URI_CLOUD_CONNECTION = `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`

module.exports = {
    URI_CLOUD_CONNECTION
} 


// const SCHEMA = process.env.SCHEMA
// const USER = process.env.USER
// const PASSWORD = process.env.PASSWORD
// const HOSTNAME = process.env.HOSTNAME
// const DATABASE = process.env.DATABASE
// const OPTIONS = process.env.OPTIONS

// const URI_CLOUD_CONNECTION = `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`
// console.log(URI_CLOUD_CONNECTION)
// const URI_LOCAL_CONNECTION = `mongodb://localhost:27017/${DATABASE}`;

// module.exports = {
//   URI_CLOUD_CONNECTION,
//   URI_LOCAL_CONNECTION,
// };