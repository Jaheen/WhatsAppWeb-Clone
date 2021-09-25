import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import MainbarHeader from "./MainbarHeader"
import MessageItem from "./MessageItem"
import Actionbar from "./Actionbar"
import { getMessages } from "services/api-services/message-service"
import { MainbarWrapper, MessagesList } from "./styled"

/**
 * Mainbar to contain chats and interactions
 */
export default function Mainbar() {

	const { activeConversationID, conversations } = useSelector(state => state.conversationReducer)
	const activeConversation = conversations.find(conversation => conversation.userID === activeConversationID)
	const user = useSelector(state => state.userReducer)
	const { messages } = useSelector(state => state.messageReducer)

	useEffect(() => {
		getMessages(activeConversationID)
	}, [activeConversationID])

	return (
		<MainbarWrapper>
			{activeConversation ? (
				<>
					<MainbarHeader activeConversation={activeConversation}/>
					<MessagesList>
						{messages.map(message => {
							return (
								<React.Fragment key={message.messageID}>
									<MessageItem user={user} activeConversation={activeConversation} message={message} />
								</React.Fragment>
							)
						})}
					</MessagesList>
					<Actionbar user={user} activeConversation={activeConversation} />
				</>
			) : null}
		</MainbarWrapper>
	)
}