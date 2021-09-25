import * as express from "express";
import { Server } from "http";
import * as admin from "firebase-admin";
import * as cors from "cors";
import api from "./routes/api";
import setup from "./setup";
import initSocketIO from "./socket-io-server";

/**
 * Main Server that handles the requests and responses
 */
class WhatsAppCloneServer {

    /**
     * Express application instance
     */
    private application: express.Application

    /**
     * PORT number on which server need to run
     */
    private PORT: number

    /**
     * HTTP server that listens using express application
     */
    private httpServer: Server

    constructor() {
        this.application = express()
        this.PORT = parseInt(process.env.PORT) || 8080
        this.httpServer = new Server(this.application)
    }

    /**
     * Initialize routes and other config
     */
    initializeServer() {
        this.application.use(cors())
        this.application.use("/api", api)
        initSocketIO(this.httpServer)
    }

    /**
     * Start the server and listen for connections
     */
    startServer() {
        setup()
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL
            }),
            storageBucket: "whatsapp-clone-1b27a.appspot.com"
        })
        this.httpServer.listen(this.PORT, () => console.log(`Server started on port ${this.PORT}`))
    }
}

/**
 * Main function
 */
(async () => {
    const appServer = new WhatsAppCloneServer()
    appServer.initializeServer()
    appServer.startServer()
})()
