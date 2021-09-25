import Drawer from "@material-ui/core/Drawer"
import styled from "styled-components"

export const StyledDrawer = styled(Drawer)`
	.MuiDrawer-paper {
		width: ${props => props.isMobileScreen ? "100%" : "30%"};
		background-color: #EDEDED;
	}
`
