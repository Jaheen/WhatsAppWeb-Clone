import { useState, useRef } from "react"
import Popover from "@material-ui/core/Popover"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { MessageHeaderWrapper, SenderName } from "./styled"

/**
 * MessageHeader
 */
export default function MessageHeader(props) {

	// refs variables and states
	const [isMenuOpen, toggleMenu] = useState(false)
	const menuButtonRef = useRef(null)

	return (
		<MessageHeaderWrapper>
			<SenderName>{props.senderName}</SenderName>
			{props.isMyMessage ? (
				<IconButton size="small" onClick={() => toggleMenu(true)} ref={menuButtonRef}>
					<ExpandMoreIcon fontSize="small" />
				</IconButton>
			) : null}
			<Popover open={isMenuOpen}
				onClick={() => toggleMenu(false)}
				onClose={() => toggleMenu(false)}
				anchorEl={menuButtonRef.current}>
				<MenuItem onClick={props.onDeleteClicked}>Delete Message</MenuItem>
			</Popover>
		</MessageHeaderWrapper>
	)
}