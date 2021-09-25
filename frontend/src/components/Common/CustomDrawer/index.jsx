import { useSelector } from "react-redux"
import { StyledDrawer } from "./styled"

/**
 * A common custom drawer component that uses redux to toggle
 */
export default function CustomDrawer(props) {

	const { isMobileScreen } = useSelector(state => state.appReducer)

	return (
		<StyledDrawer isMobileScreen={isMobileScreen} open={props.open} onClose={props.onClose}>
			{props.children}
		</StyledDrawer>
	)
}