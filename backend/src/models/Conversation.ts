import { UUID, UUIDV4, INTEGER } from "sequelize";
import connection from "./connection";
import Message from "./Message";
import User from "./User";

const Conversation = connection.define("Conversation", {
    user1ID: {
        type: UUID,
        references: {
            model: User,
            key: "userID"
        }
    },
    unreadMessages: {
        type: INTEGER,
        defaultValue: 0
    }
})

Conversation.belongsTo(User, {
    as: "user2",
    foreignKey: {
        name: "user2ID",
        allowNull: false
    }
})

Conversation.belongsTo(Message, {
    as: "lastMessage",
    foreignKey: {
        name: "lastMessageID"
    }
})

export default Conversation
