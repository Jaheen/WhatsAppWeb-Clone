import styled from "styled-components"

export const MessageItemWrapper = styled.section`
	align-self: ${props => props.isMyMessage? "flex-end" : "flex-start"};
	min-width: 30%;
	max-width: 90%;
	background-color: ${props => props.isMyMessage? "#cefca9" : "white"};
	border-radius: 8px;
	padding: 8px;
	margin: 8px;
	display: flex;
	flex-direction: column;
`

// Message Header components
export const MessageHeaderWrapper = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
export const SenderName = styled.p`
	font-size: 13px;
	font-weight: bold;
`

// Message Content components
export const MessageContentWrapper = styled.section`
	display: flex;
	align-items: center;
`
export const Image = styled.img`
	max-width: 350px;
	height: auto;
	margin: auto;
	@media(max-width: 576px) {
		max-width: 250px;
	}
`
export const Video = styled.video`
	max-width: 600px;
	@media(max-width: 576px) {
		max-width: 300px;
	}
`

// Message Footer components
export const MessageFooterWrapper = styled.section`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`
export const TimeStamp = styled.span`
	font-size: 10px;
	color: grey;
`
