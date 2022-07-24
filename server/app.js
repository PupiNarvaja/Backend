module.exports = (async () => {
    // En orden alfabetico y primero librerias externas...
    require('dotenv').config()
    const cookieParser = require("cookie-parser")
    const express = require("express")
    const session = require("express-session")
    const passport = require("passport")
    const path = require("path")
    const cors = require("cors")
    
    const mongoose = require("mongoose")
    const mongoStore = require("connect-mongo")
    
    // ...luego nuestros propios documentos.
    const app = express()
    const server = require("http").Server(app)
    const initializePassport = require("./passport/local")
    const logger = require('./log')

    const { Server } = require("socket.io") 
    const io = new Server(server)
    const chat = require("./chat")
    const chatModel = require("./models/chat.model")

    const routerApiCart = require("./routers/api/api.cart.router")
    const routerApiUsers = require("./routers/api/api.users.router")
    const routerApiProducts = require("./routers/api/api.products.router")
    const routerApiOrders = require("./routers/api/api.orders.router")

    const routerUniversal = require("./routers/router.index")
    const routerUniversalNoAuth = require("./routers/router.indexNoAuth")
    const router404 = require("./routers/404.router")
    const routerJwt = require("./routers/jwt.router")
    const routerLogin = require("./routers/login.router")
    const routerLogout = require("./routers/logout.router")
    const routerRegister = require("./routers/register.router")
    const routerChat = require("./routers/chat.router")
    const routerAdmin = require("./routers/adminRoutes/admin.router")

    const { URI_CLOUD_CONNECTION } = require("./config")

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

        io.on("connection", async (socket) => {
            console.log("A user connected.")

            const result = await chatModel.findMessage()
            socket.emit("output-messages", result)
        
            socket.on("chat", async (msg) => {
                await chatModel.saveMessage(msg)

                io.emit("chat", msg)
            })
        })

        app.use("/chat", routerChat)

        app.use("/", routerUniversal)

        app.use("/cart", routerUniversal)

        app.use("/profile", routerUniversal)
        
        app.use("/order", routerUniversal)

        app.use("/product/:id", routerUniversal)

        app.use("/unauthorized", routerUniversalNoAuth)

        app.use("/login", routerLogin)

        app.use("/auth/jwt", routerJwt)

        app.use("/logout", routerLogout)

        app.use("/register", routerRegister)
        
        app.use("/api/users", routerApiUsers)
        
        app.use("/api/cart", routerApiCart)
        
        app.use("/api/orders", routerApiOrders)

        app.use("/api/products", routerApiProducts)

        app.use("/admin", routerAdmin)

        //app.use(router404)

    } catch (error) {
        logger.error("Error on mongo.", error)
    }

    return server
})()