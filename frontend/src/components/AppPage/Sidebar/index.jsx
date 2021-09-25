import { useSelector } from "react-redux"
import SidebarHeader from "./SidebarHeader"
import SearchBar from "./SearchBar"
import ConversationItem from "./ConversationItem"
import ProfileDrawer from "./ProfileDrawer"
import { SidebarWrapper, ConversationsList } from "./styled"

/**
 * Sidebar component
 */
export default function Sidebar() {

	const { conversations } = useSelector(state => state.conversationReducer)

	return (
		<SidebarWrapper>
			<SidebarHeader />
			<SearchBar />
			<ConversationsList>
				{conversations.map(conversation => {
					return (
						<ConversationItem key={conversation.userID} conversation={conversation} />
					)
				})}
			</ConversationsList>
			<ProfileDrawer />
		</SidebarWrapper>
	)
}