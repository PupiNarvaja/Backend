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
    const routerHome = require("./routers/home")
    const routerCart = require("./routers/cart")
    const routerJwt = require("./routers/jwt")

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
                ttl: 60 * 30,
                expires:  60 * 30,
                autoRemove: "native"
            })
        }))
        app.use(passport.initialize())
        app.use(passport.session())

        app.use("/assets/", express.static(path.join(__dirname, "../client/dist/assets")))
        app.use("/static/", express.static(path.join(__dirname, "../client/dist")))

        app.use("/", routerHome)

        app.use("/register", routerRegister)

        app.use("/login", routerLogin)

        app.use("/auth/jwt", routerJwt)

        app.use("/logout", routerLogout)

        // app.get("/cart", isAuthenticated, (req, res) => {
        //     res.sendFile(path.join(__dirname, "./views/cart.html"))
        //     // const total = cart.reduce((total, p) => total + p.price, 0)
        // })

        // app.use("/api/cart", routerCart)

        app.use("/api/products", routerProducts)

        // app.get("*", (req, res) => {
        //     res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"))
        // })

        app.listen(PORT, () => logger.info("🚀 Server online."))

    } catch (error) {
        logger.error("Error on mongo.", error)
    }
})()