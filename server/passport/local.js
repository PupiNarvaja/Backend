const LocalStrategy = require("passport-local").Strategy
const UserModel = require("../models/user")
const CartModel = require("../models/cart")
const logger = require('../log')

module.exports = (passport) => {
    const authenticateUser = async (email, password, done) => {
        
        try {
            if (!await UserModel.existsByEmail(email)) {
                logger.error("Requested user does not exist.")
                return done(null, false)
            }

            if (!await UserModel.isPasswordValid(email, password)) {
                logger.error("Wrong password!")
                return done(null, false)
            }

            const user = await UserModel.getUserByEmail(email)

            done(null, user)

        } catch (error) {
            done(error)
        }
    }

    const registerUser = async (req, email, password, done) => {
        const { firstname, lastname, age, city, address, phone } = req.body

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
                address: `${city}, ${address}`,
                phone,
                profile: "https://res.cloudinary.com/this/image/upload/v1656340004/avataaars_prf89a.png"
            })

            await CartModel.createCart(user._id)
    
            done(null, {
                ...user,
                id: user._id,
                name: `${firstname} ${lastname}`
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
        passReqToCallback: true
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