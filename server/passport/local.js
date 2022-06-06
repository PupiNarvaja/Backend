const LocalStrategy = require("passport-local").Strategy
const UserModel = require("../models/user")

module.exports = (passport) => {
    const authenticateUser = async (email, password, done) => {
        
        try {
            if (!await UserModel.existsByEmail(email)) {
                console.log("No existe el user.")
                return done(null, false)
            }

            if (!await UserModel.isPasswordValid(email, password)) {
                console.log("Contraseña incorrecta!")
                return done(null, false)
            }

            const user = await UserModel.getUserByEmail(email)
            console.log(user)

            done(null, user)

        } catch (error) {
            done(error)
        }
    }

    const registerUser = async (req, email, password, done) => {
        const { firstname, lastname } = req.body

        try {
            if (await UserModel.existsByEmail(email)) {
                console.log("user already exists!")
                return done(null, false)
            }
    
            const user = await UserModel.saveUser({
                email,
                password,
                firstname,
                lastname
            })
    
            done(null, {
                ...user,
                id: user._id,
                name: `${firstname} ${lastname}` // ----------> Problema: Informacion redundante. Al guardar, si guardo en mongo como "id", darias problemas por no tener_?
            })

        } catch (error) {
            done(error)
        }
    }

    passport.use("login", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, authenticateUser))

    passport.use("register", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // req puede pasar a la callback, lo que hace posible el registro y su posterior login automatico.
    }, registerUser))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        done(null, await UserModel.getUserById(id))
    })
}