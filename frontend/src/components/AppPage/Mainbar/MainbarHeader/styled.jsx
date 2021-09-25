import styled from "styled-components"

export const HeaderWrapper = styled.section`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px;
	background-color: #EDEDED;
	border-left: 1px lightgrey solid;
`
export const ProfileData = styled.div`
	margin: 0 10px;
	flex-grow: 1;
	@media(max-width: 576px) {
		max-width: 50%;
	}
`
export const ProfileName = styled.h4`
	font-weight: normal;
`
export const ProfileDescription = styled.p`
	font-size: 13px;
	color: grey;
	max-width: 75%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`
