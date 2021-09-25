import styled from "styled-components"

export const DrawerHeader = styled.section`
	padding: 1em;
	background-color: #00BFA5;
	display: flex;
	align-items: center;
	* {
		color: white !important;
	}
	h4 {
		font-weight: normal;
		margin: 0 10px;
	}
`

export const ProfilePicContainer = styled.section`
	position: relative;
	width: 250px;
	height: 250px;
	border-radius: 1000px;
	margin: 2em auto;
	border: 2px solid #00BFA5;
	cursor: pointer;
	&:hover .overlay {
		visibility: visible;
	}
`
export const ProfilePic = styled.img`
	width: 100%;
	height: 100%;
	position: absolute;
	border-radius: inherit;
`
export const ProfilePicOverlay = styled.div`
	background-color: rgba(126, 127, 127, 0.5);
	width: 100%;
	height: 100%;
	position: absolute;
	border-radius: inherit;
	top: 0;
	left: 0;
	visibility: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white !important;
`
export const ProfilePicOverlayContent = styled.div`
	display: flex;
	max-width: 50%;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	text-align: center;
`

export const FieldContainer = styled.section`
	padding: 1em;
	background-color: white;
	margin: 1em 0;
	.MuiInput-root {
		border: none !important;
	}
`
export const FieldTitle = styled.p`
	color: #00BFA5;
	font-size: 14px;
`