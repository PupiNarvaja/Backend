const LocalStrategy = require("passport-local").Strategy
const UserModel = require("../models/user")
const logger = require('../log')

module.exports = (passport) => {
    const authenticateUser = async (email, password, done) => {
        
        try {
            if (!await UserModel.existsByEmail(email)) {
                logger.error("No existe el user.")
                return done(null, false)
            }

            if (!await UserModel.isPasswordValid(email, password)) {
                logger.error("Contraseña incorrecta!")
                return done(null, false)
            }

            const user = await UserModel.getUserByEmail(email)
            logger.info(user)

            done(null, user)

        } catch (error) {
            done(error)
        }
    }

    const registerUser = async (req, email, password, done) => {
        const { firstname, lastname, age, address, phone } = req.body

        try {
            if (await UserModel.existsByEmail(email)) {
                logger.error("user already exists!")
                return done(null, false)
            }
    
            const user = await UserModel.saveUser({
                email,
                password,
                firstname,
                lastname,
                age,
                address,
                phone
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
        const user = await UserModel.getUserById(id)
        done(null, {
            id: user._id.toString(),
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        })
    })
}