import { useState, useRef, useEffect } from "react"
import IconButton from "@material-ui/core/IconButton"
import DoneIcon from "@material-ui/icons/Done"
import EditIcon from "@material-ui/icons/Edit"
import { EditableFieldWrapper, EditableFieldInput } from "./styled"

/**
 * Editable field to edit and render profile data
 */
export default function EditableField(props) {

	const [mode, toggleMode] = useState(false)
	const inputRef = useRef(null)

	const onEditDone = () => {
		if(inputRef.current.value.trim() !== props.defaultValue) {
			if(inputRef.current.value.trim() !== "") {
				props.onEditDone(inputRef.current.value)
			}
		}
		toggleMode(false)
	}

	const EditButton = (
		<IconButton size="small" onClick={() => toggleMode(true)}>
			<EditIcon fontSize="small" />
		</IconButton>
	)

	const DoneButton = (
		<IconButton size="small" onClick={onEditDone}>
			<DoneIcon fontSize="small" />
		</IconButton>
	)

	useEffect(() => {
		if(mode) {
			inputRef.current.focus()
		}
	})

	return (
		<EditableFieldWrapper>
			<EditableFieldInput type="text" readOnly={!mode} defaultValue={props.defaultValue} ref={inputRef} />
			{!mode ? EditButton : DoneButton}
		</EditableFieldWrapper>
	)
}
