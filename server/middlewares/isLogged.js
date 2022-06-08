module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log("PASSPORT DENIED")
        return res.redirect("/login")
    }

    next()
}