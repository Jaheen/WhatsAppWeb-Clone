import { UUIDV4, STRING, TEXT } from "sequelize";
import connection from "./connection";
import User from "./User";

const Message = connection.define("Message", {
    messageID: {
        type: STRING,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    contentType: {
        type: STRING,
        values: ["TEXT", "LINK", "IMAGE", "VIDEO", "AUDIO"],
        defaultValue: "TEXT"
    },
    content: {
        type: TEXT
    },
    timestamp: {
        type: STRING,
        defaultValue: () => Date.now().toString()
    }
})

Message.belongsTo(User, {
    foreignKey: {
        name: "senderID",
        allowNull: false
    }
})

Message.belongsTo(User, {
    foreignKey: {
        name: "recieverID",
        allowNull: false
    }
})

export default Message
