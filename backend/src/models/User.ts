import { UUID, UUIDV4, STRING, TEXT } from "sequelize";
import connection from "./connection";

const User = connection.define("User", {
    userID: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    username: {
        type: STRING
    },
    phoneNumber: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: TEXT,
        defaultValue: "Hi there I'm using WhatsApp Clone"
    },
    profilePicURL: {
        type: TEXT,
        defaultValue: "https://firebasestorage.googleapis.com/v0/b/whatsapp-clone-1b27a.appspot.com/o/profile-pictures%2Fdefault-avatar.jpg?alt=media&token=03b17858-f970-495b-b377-f008d9fbacd1"
    },
    lastActive: {
        type: STRING,
        defaultValue: () => Date.now().toString()
    }
})

export default User
