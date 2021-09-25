import styled from "styled-components";

export const IndexPageWrapper = styled.div`
	min-height: 100vh;
    background-color: #D7DBD6;
`
export const MainContainer = styled.div`
	height: 35vh;
	background-color: #00BFA5;
	position: relative;
`
export const Header = styled.div`
	width: 80%;
	margin: auto;
	padding: 1em;
	display: flex;
	align-items: center;
`
export const HeaderBranding = styled.div`
	display: flex;
	align-items: center;
	img {
		margin-right: 10px;
		height: 32px;
	}
	p {
		color: white;
	}
`
export const FormContainer = styled.section`
	position: absolute;
	top: 80%;
	left: 50%;
	transform: translateX(-50%);
	z-index: 100;
	min-height: 150px;
	width: 35%;
	background-color: white;
	box-shadow: 2px 2px 10px #9c9c9c;
	padding: 1em;
	@media(max-width: 576px) {
		width: 90%;
	}
`
export const Form = styled.section`
	min-height: inherit;
	overflow: hidden;
	display: flex;
	flex-wrap: nowrap;
	align-items: center
`
export const FormSlide = styled.div`
	width: 100%;
	padding: 0 1em;
	min-height: inherit;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	button {
		margin: 0 10px;
	}
`
export const FormSlideInput = styled.input`
	width: 100%;
	padding: 1em;
	background-color: lightgrey;
	border: none;
	outline: none;
	border-radius: 8px;
`
