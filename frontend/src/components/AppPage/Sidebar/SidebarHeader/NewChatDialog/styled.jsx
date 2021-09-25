import Button from "@material-ui/core/Button"
import styled from "styled-components"

export const DialogContent = styled.section`
	padding: 1em;
	width: fit-content;
	max-width: 35vw;
	@media(max-width: 576px) {
		max-width: 90vw;;
	}
`
export const DialogTitle = styled.h4`
	font-weight: normal;
`
export const DialogForm = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-wrap: wrap;
	padding: 1em 0;
`
export const DialogInput = styled.input`
	background-color: lightgrey;
	outline: none;
	border: none;
	border-radius: 5px;
	width: 100%;
	padding: 1em;
`
export const DialogButton = styled(Button)`
	width: 30%;
	margin-top: 10px !important;
	background-color: ${props => props.variant === 'contained' ? "#00BFA5 !important" : ""};
	color: ${props => props.variant === 'contained' ? "white !important" : "#00BFA5 !important"};
	border: 1px solid ${props => props.variant === 'outlined' ? "#00BFA5 !important" : ""};
	@media(max-width: 576px) {
		width: fit-content;
	}
`
export const DialogErrorText = styled.span`
	color: red;
	width: 100%;
	text-align: center;
	font-size: 15px;
`
