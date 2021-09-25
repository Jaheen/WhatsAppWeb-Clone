import CircularProgress from "@material-ui/core/CircularProgress"
import { LoaderContainer, LoaderTitle } from "./styled"

/**
 * Loader to indicate process is loading currently
 */
export default function Loader(props) {
	return (
		<LoaderContainer open={props.open}>
			<CircularProgress />
			<LoaderTitle>{props.loaderText}</LoaderTitle>
		</LoaderContainer>
	)
}