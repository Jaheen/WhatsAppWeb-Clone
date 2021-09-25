import { useSelector, useDispatch } from "react-redux"
import { useState, useRef } from "react"
import Popover from "@material-ui/core/Popover"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NewChatDialog from "./NewChatDialog"
import { HeaderWrapper, HeaderAvatar } from "./styled"

/**
 * Header for sidebar
 */
export default function SidebarHeader(props) {
	
	// refs states and other vars
	const [isMenuOpen, toggleMenu] = useState(false)
	const [isNewChatDialogOpen, toggleNewChatDialog] = useState(false)
	const menuButtonRef = useRef(null)
	const { profilePicURL } = useSelector(state => state.userReducer)
	const dispatch = useDispatch()

	return (
		<HeaderWrapper>
			<HeaderAvatar onClick={() => dispatch({ type: "toggle-profile-drawer" })} src={profilePicURL} />
			<div>
				<IconButton onClick={() => toggleNewChatDialog(true)}>
					<ChatIcon />
				</IconButton>
				<IconButton ref={menuButtonRef} onClick={() => toggleMenu(true)}>
					<MoreVertIcon />
				</IconButton>
			</div>
			<Popover 
				open={isMenuOpen} 
				onClose={() => toggleMenu(false)} 
				onClick={() => toggleMenu(false)}
				anchorEl={menuButtonRef.current}
				anchorOrigin={{
					horizontal: "right",
					vertical: "bottom"
				}}
				transformOrigin={{
					horizontal: "right",
					vertical: "center"
				}}>
				<MenuItem onClick={() => toggleNewChatDialog(true)}>New Conversation</MenuItem>
				<MenuItem onClick={() => dispatch({ type: "toggle-profile-drawer" })}>My Profile</MenuItem>
				<MenuItem>Logout</MenuItem>
			</Popover>
			<NewChatDialog open={isNewChatDialogOpen} onClose={() => toggleNewChatDialog(false)} />
		</HeaderWrapper>
	)
}