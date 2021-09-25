import { useSelector, useDispatch } from "react-redux"
import { useState, useRef } from "react"
import MenuItem from "@material-ui/core/MenuItem"
import Popover from "@material-ui/core/Popover"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { HeaderWrapper, ProfileData, ProfileName, ProfileDescription } from "./styled"

/**
 * Mainbar header
 */
export default function MainbarHeader(props) {

	const menuButtonRef = useRef(null)
	const [isMenuOpen, toggleMenu] = useState(false)
	const { isMobileScreen } = useSelector(state => state.appReducer)
	const dispatch = useDispatch()

	return (
		<HeaderWrapper>
			{isMobileScreen ? (
				<IconButton onClick={() => dispatch({ type: "set-active-conversation-ID", targetID: "" })}>
					<ArrowBackIcon />
				</IconButton>
			) : null}
			<Avatar src={props.activeConversation.profilePicURL} />
			<ProfileData>
				<ProfileName>{props.activeConversation.username || props.activeConversation.phoneNumber}</ProfileName>
				<ProfileDescription>{props.activeConversation.description}</ProfileDescription>
			</ProfileData>
			<div>
				<IconButton onClick={() => toggleMenu(true)} ref={menuButtonRef}>
					<MoreVertIcon />
				</IconButton>
			</div>
			<Popover open={isMenuOpen}
				onClick={() => toggleMenu(false)}
				onClose={() => toggleMenu(false)}
				anchorEl={menuButtonRef.current}
				anchorOrigin={{
					horizontal: "right",
					vertical: "bottom"
				}}
				transformOrigin={{
					horizontal: "left",
					vertical: "center"
				}}>
				<MenuItem onClick={() => dispatch({ type: "clear-messages" })}>Clear Messages</MenuItem>
			</Popover>
		</HeaderWrapper>
	)
}