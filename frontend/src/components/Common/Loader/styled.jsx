import styled from "styled-components"

export const LoaderContainer = styled.section`
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #000000de;
	z-index: 1000;
	overflow: hidden;
	display: ${props => props.open? "flex" : "none"};
	justify-content: center;
	align-items: center;
	* {
		color: white;
	}
`
export const LoaderTitle = styled.p`
	font-size: 20px;
	margin-left: 10px;
`
