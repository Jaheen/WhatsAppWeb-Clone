import { MessageItemWrapper } from "./styled"
import MessageHeader from "./MessageHeader"
import MessageContent from "./MessageContent"
import MessageFooter from "./MessageFooter"
import { deleteMessage } from "services/socket-services/socket-messaging-service"

/**
 * Message Item to render
 */
export default function MessageItem(props) {
	
	const isMyMessage = props.message.senderID === props.user.userID

	return (
		<MessageItemWrapper isMyMessage={isMyMessage}>
			<MessageHeader
				onDeleteClicked={() => deleteMessage(props.message.messageID)}
				isMyMessage={isMyMessage} 
				senderName={isMyMessage ? props.user.username || props.user.phoneNumber : props.activeConversation.username || props.activeConversation.phoneNumber} />
			
			<MessageContent contentType={props.message.contentType} content={props.message.content} />
			<MessageFooter timestamp={props.message.timestamp} />
		</MessageItemWrapper>
	)
}