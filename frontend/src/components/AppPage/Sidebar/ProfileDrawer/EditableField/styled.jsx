import styled from "styled-components"

export const EditableFieldWrapper = styled.section`
	display: flex;
	align-items: center;
`
export const EditableFieldInput = styled.input`
	flex-grow: 1;
	border: none;
	outline: none;
	margin-right: 10px;
	padding: 1em 0;
	&:focus {
		border-bottom: ${props => !props.readOnly ? "1px solid #00BFA5" : "initial"};
	}
`
