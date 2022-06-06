const router = require("express").Router()
const passport = require("passport")
const path = require("path") // Hasta usar react con SSR.

// /login
router.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../views/login.html"))
})

router.post("/", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login"
}))


module.exports = router;
// Futuras mejoras: 
// Implementar el e.preventDefault() para que los datos no se borren si el usuario se equivoca de contraseña y tal.
// En el front end, dar boton que de al input password un type="password" a type="text".