import styled from "styled-components"

export const AppPageWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-wrap: wrap;
`
export const SidebarContainer = styled.div`
	flex-grow: 1;
	max-width: 30vw;
	height: inherit;
	flex-shrink: 0;
	@media(max-width: 576px) {
		max-width: 100vw;
	}
`
export const MainbarContainer = styled.div`
	width: 70%;
	height: inherit;
	flex-shrink: 0;
	@media (max-width: 576px) {
		width: 100%;
	}
	@media (max-width: 900px) {
		width: 50%;
	}
`
export const MainbarPlaceholder = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #09e609;
	background-color: #f4f4f4;
`
