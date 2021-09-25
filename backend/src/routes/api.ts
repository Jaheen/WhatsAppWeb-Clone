import { json } from "body-parser";
import { Router } from "express";
import AuthController from "../controllers/auth-controller";
import ConversationController from "../controllers/conversation-controller";
import FirebaseAuthMiddleware from "../middlewares/firebase-auth-middleware";
import AuthMiddleware from "../middlewares/auth-middleware";
import ProfileController from "../controllers/profile-controller";
import MessageController from "../controllers/message-controller";

const api: Router = Router()

api.use(json())

/**
 * Routes to handle authentication
 */
api.post("/addUser", FirebaseAuthMiddleware, AuthController.addUser)

/**
 * Routes to handle requests on user profile
 */
api.get("/getMyProfile", AuthMiddleware, ProfileController.getMyProfile)
api.put("/updateUsername", AuthMiddleware, ProfileController.updateUsername)
api.put("/updateDescription", AuthMiddleware, ProfileController.updateDescription)
api.put("/updateProfilePic", AuthMiddleware, ProfileController.updateProfilePic)

/**
 * Routes to handle requests on conversations
 */
api.get("/getConversations", AuthMiddleware, ConversationController.getConversations)
api.post("/createConversation", AuthMiddleware, ConversationController.createConversation)
api.delete("/deleteConversation", AuthMiddleware, ConversationController.deleteConversation)

/**
 * Routes to handle requests on messages
 */
api.get("/getMessages", AuthMiddleware, MessageController.getMessages)

export default api
