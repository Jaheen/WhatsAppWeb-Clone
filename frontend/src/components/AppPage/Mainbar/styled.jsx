import styled from "styled-components"
import ChatBackground from "assets/images/chat-background.png"

export const MainbarWrapper = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`
export const MessagesList = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column-reverse;
	overflow: auto;
	background-image: url(${ChatBackground});
	padding: 0 10px;
`
