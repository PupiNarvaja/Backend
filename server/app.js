(async () => {
    // En orden alfabetico y primero librerias externas...
    require('dotenv').config()
    const cookieParser = require("cookie-parser")
    const express = require("express")
    const session = require("express-session")
    const passport = require("passport")

    const mongoose = require("mongoose")
    const mongoStore = require("connect-mongo")

    // ...luego nuestros propios documentos.
    const app = express()
    const initializePassport = require("./passport/local")

    const routerProducts = require("./routers/products")
    const routerRegister = require("./routers/register")
    const routerLogout = require("./routers/logout")
    const routerLogin = require("./routers/login")
    const routerCart = require("./routers/cart")
    const routerJwt = require("./routers/jwt")

    const isAuthenticated = require("./middlewares/isAuthenticated")

    const logger = require('./log')
    const path = require("path")

    const { URI_CLOUD_CONNECTION, PORT } = require("./config")

    try {
        await mongoose.connect(URI_CLOUD_CONNECTION)
    
        initializePassport(passport)
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(cookieParser("secret"))
        app.use(session({
            secret: "secret",
            resave: true,
            saveUninitialized: true,

            store: new mongoStore({
                mongoUrl:  URI_CLOUD_CONNECTION,
                ttl: 60 * 3,
                expires:  60 * 3,
                autoRemove: "native"
            })
        }))
        app.use(passport.initialize())
        app.use(passport.session())

        app.use("/static/", express.static(path.join(__dirname, "../public")))

        app.get("/", isAuthenticated, (req, res) => {
            const { firstname, lastname } = req.user
            
            res.send(`Welcome ${firstname} ${lastname} <br> <form action="/logout" method="POST"><button type="submit">Logout</button></form>`)
        })

        app.use("/auth/jwt", routerJwt)

        app.use("/logout", routerLogout)

        app.use("/login", routerLogin)

        app.use("/register", routerRegister)

        app.use("/api/cart", routerCart)

        app.use("/api/products", routerProducts)

        app.use("*", (req, res) => res.status(404).send({ error: "Page not found." }))

        app.listen(PORT, () => logger.info("🚀 Server online."))

    } catch (error) {
        logger.error("Error on mongo.", error)
    }
})()