import { useRef } from "react"
import Dialog from "@material-ui/core/Dialog"
import { createConversation } from "services/api-services/conversation-service"
import { DialogContent, DialogTitle, DialogForm, DialogInput, DialogButton, DialogErrorText } from "./styled"

/**
 * Dialog to get data to create a new chat
 */
export default function NewChatDialog(props) {
	
	const errorTextRef = useRef(null)
	const phoneInputRef = useRef(null)

	const onKeyPressed = (ev) => {
		if(ev.key === "Enter")
			onCreateClicked()
	}

	const onCreateClicked = () => {
		if(phoneInputRef.current.value.trim() !== "") {
			createConversation(phoneInputRef.current.value)
				.then(() => props.onClose())
				.catch(message => errorTextRef.current.innerText = message)
		} else {
			errorTextRef.current.innerText = "Please Enter a valid mobile number"
		}
	}

	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogContent>
				<DialogTitle>Create New Conversation</DialogTitle>
				<DialogForm>
					<DialogInput onKeyPress={onKeyPressed} ref={phoneInputRef} type="text" placeholder="Mobile Number of the user" />
					<DialogErrorText ref={errorTextRef}></DialogErrorText>
					<DialogButton variant="outlined" onClick={props.onClose}>Cancel</DialogButton>
					<DialogButton variant="contained" onClick={onCreateClicked}>Create</DialogButton>
				</DialogForm>
			</DialogContent>
		</Dialog>
	)
}