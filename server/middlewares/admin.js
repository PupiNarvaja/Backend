const isAdmin = true

module.exports = (req, res, next) => {
  isAdmin
    ? next()
    : res.status(401).send({
        error: 401,
        description: `Method: ${req.method} not authorized.`,
    })
}