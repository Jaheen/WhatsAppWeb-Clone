import SearchIcon from "@material-ui/icons/Search"
import { SearchBarWrapper, SearchField, SearchFieldInput } from "./styled"

/**
 * Searchbar to filter recent conversations
 */
export default function SearchBar() {
	return (
		<SearchBarWrapper>
			<SearchField>
				<SearchIcon fontSize="small" />
				<SearchFieldInput type="text" placeholder="Search chats here ..." />
			</SearchField>
		</SearchBarWrapper>
	)
}