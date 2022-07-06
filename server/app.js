(async () => {
    // En orden alfabetico y primero librerias externas...
    require('dotenv').config()
    const cookieParser = require("cookie-parser")
    const express = require("express")
    const session = require("express-session")
    const passport = require("passport")
    const path = require("path")
    
    const mongoose = require("mongoose")
    const mongoStore = require("connect-mongo")
    
    // ...luego nuestros propios documentos.
    const app = express()
    const initializePassport = require("./passport/local")
    const logger = require('./log')

    const routerApiCart = require("./routers/api/apiCart")
    const routerApiUser = require("./routers/api/apiUser")
    const routerApiProducts = require("./routers/api/apiProducts")
    const routerApiOrders = require("./routers/api/api.orders.router")

    const router404 = require("./routers/404")
    const routerJwt = require("./routers/jwt")
    const routerCart = require("./routers/cart")
    const routerHome = require("./routers/home")
    const routerOrder = require("./routers/order")
    const routerLogin = require("./routers/login")
    const routerLogout = require("./routers/logout")
    const routerProfile = require("./routers/profile")
    const routerRegister = require("./routers/register")
    const routerUnauthorized = require("./routers/unauthorized")
    const routerAdminOrders = require("./routers/adminRoutes/admin.route.orders")

    const { URI_CLOUD_CONNECTION, PORT } = require("./config")
    const cors = require("cors")

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
        app.use(cors())


        app.use("/assets/", express.static(path.join(__dirname, "../client/dist/assets")))
        app.use("/static/", express.static(path.join(__dirname, "../client/dist")))


        app.use("/", routerHome)

        app.use("/cart", routerCart)

        app.use("/login", routerLogin)

        app.use("/auth/jwt", routerJwt)

        app.use("/logout", routerLogout)

        app.use("/profile", routerProfile)

        app.use("/order", routerOrder)

        app.use("/register", routerRegister)

        app.use("/unauthorized", routerUnauthorized)

        app.use("/api/user", routerApiUser)

        app.use("/api/cart", routerApiCart)
        
        app.use("/api/orders", routerApiOrders)

        app.use("/api/products", routerApiProducts)

        app.use("/admin/orders", routerAdminOrders)

        //app.use(router404)

        app.listen(PORT, () => logger.info("🚀 Server online."))

    } catch (error) {
        logger.error("Error on mongo.", error)
    }
})()