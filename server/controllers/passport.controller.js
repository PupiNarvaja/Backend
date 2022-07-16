const passport = require("passport")

const login = passport.authenticate("login", {})

const register = passport.authenticate("register", {
    successRedirect: "/auth/jwt",
    failureRedirect: "/register"
})

module.exports = {
    login,
    register
}