import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import Popover from "@material-ui/core/Popover"
import ExpandMore from "@material-ui/icons/ExpandMore"
import { useRef, useState } from "react"
import { deleteConversation } from "services/api-services/conversation-service"
import { conversationRead } from "services/socket-services/socket-messaging-service"
import { useDispatch } from "react-redux"
import { ConversationWrapper, AvatarContainer, DataContainer, ChatName, LastChat, MetadataContainer, LastActive, UnreadMessages } from "./styled"

/**
 * ConversationItem component to render recent chat
 */
export default function ConversationItem(props) {

    const [menuOpen, toggleMenu] = useState(false)
    const menuButtonRef = useRef(null)
    const dispatch = useDispatch()

    const onConversationClicked = () => {
        dispatch({ type: "set-active-conversation-ID", targetID: props.conversation.userID })
        conversationRead(props.conversation.userID)
    }

    return (
        <>
            <ConversationWrapper onClick={onConversationClicked}>
                <AvatarContainer>
                    <Avatar src={props.conversation.profilePicURL} />
                </AvatarContainer>
                <DataContainer>
                    <ChatName>{props.conversation.username || props.conversation.phoneNumber}</ChatName>
                    <LastChat>{props.conversation.lastMessage}</LastChat>
                </DataContainer>
                <MetadataContainer>
                    <LastActive>{getLastActive(props.conversation.lastActive)}</LastActive>
                    {props.conversation.unreadMessages > 0 ? <UnreadMessages>{props.conversation.unreadMessages}</UnreadMessages> : null}
                    <IconButton ref={menuButtonRef} size="small" onClick={() => toggleMenu(true)}>
                        <ExpandMore fontSize="small" />
                    </IconButton>
                </MetadataContainer>
            </ConversationWrapper>

            <Popover
                open={menuOpen}
                anchorEl={menuButtonRef.current}
                onClick={() => toggleMenu(false)}
                onClose={() => toggleMenu(false)}>
                <MenuItem onClick={() => deleteConversation(props.conversation.userID)}>Delete Conversation</MenuItem>
            </Popover>
        </>
    )
}

/**
 * Get the formatted last active timestamp
 * @param lastActive string representation of last active
 */
function getLastActive(lastActive) {
    if (lastActive === "now")
        return lastActive
    else {
        const dateTime = new Date(parseInt(lastActive))
        const today = new Date()
        switch (today.getDate() - dateTime.getDate()) {
            case 0:
                if (dateTime.getHours() > 12)
                    return `${(dateTime.getHours() - 12).toLocaleString("en", { minimumIntegerDigits: 2 })}:${dateTime.getMinutes().toLocaleString("en", { minimumIntegerDigits: 2 })} PM`
                else
                    return `${dateTime.getHours().toLocaleString("en", { minimumIntegerDigits: 2 })}:${dateTime.getMinutes().toLocaleString("en", { minimumIntegerDigits: 2 })} AM`
            case 1:
                return "Yesterday"
            default:
                return `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`
        }
    }
}

