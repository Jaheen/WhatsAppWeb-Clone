import * as dotenv from "dotenv"
import Conversation from "./models/Conversation"
import Message from "./models/Message"
import User from "./models/User"

/**
 * Code to be run before starting the server
 */
export default function setup() {

    dotenv.config()
    
    User.sync().then(() => console.log("USERS TABLE SYNCED SUCCESSFULLY")).catch(console.log)
    Conversation.sync().then(() => console.log("CONVERSATIONS TABLE SYNCED SUCCESSFULLY")).catch(console.log)
    Message.sync().then(() => console.log("MESSAGES TABLE SYNCED SUCCESSFULLY")).catch(console.log)
}
