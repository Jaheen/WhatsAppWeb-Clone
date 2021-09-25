import { useRef, useState } from "react"
import IconButton from "@material-ui/core/IconButton"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import { ActionbarWrapper, Messagebox } from "./styled"
import { sendMessage } from "services/socket-services/socket-messaging-service"
import FileUploadDialog from "components/Common/FileUploadDialog"

/**
 * Actionbar to send messages and files
 */
export default function Actionbar(props) {

	const messageBoxRef = useRef(null)
	const [fileUploadDialogOpen, toggleFileUploadDialog] = useState(false)

	const onKeyPressed = (ev) => {
		if(ev.key === "Enter") {
			if(messageBoxRef.current.value.trim() !== "") {
				sendMessage({
					senderID: props.user.userID,
					recieverID: props.activeConversation.userID,
					contentType: "TEXT",
					content: messageBoxRef.current.value,
					timestamp: Date.now()
				})
				messageBoxRef.current.value = ""
			}
		}
	}

	const onFileUploaded = (downloadURL) => {
		sendMessage({
			senderID: props.user.userID,
			recieverID: props.activeConversation.userID,
			contentType: "IMAGE",
			content: downloadURL,
			timestamp: Date.now()
		})
		toggleFileUploadDialog(false)
	}

	return (
		<ActionbarWrapper>
			<IconButton onClick={() => toggleFileUploadDialog(true)}>
				<AttachFileIcon />
			</IconButton>
			<Messagebox onKeyPress={onKeyPressed} ref={messageBoxRef} type="text" placeholder="Send message here..." />
			<FileUploadDialog
			 	open={fileUploadDialogOpen}
			 	folderName="media-uploads"
			 	onComplete={onFileUploaded}
			 	title="Upload File to Send" />
		</ActionbarWrapper>
	)
}