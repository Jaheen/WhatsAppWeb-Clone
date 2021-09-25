import { MessageFooterWrapper, TimeStamp } from "./styled"

/**
 * Message Footer
 */
export default function MessageFooter(props) {

	/**
	 * Format time stamp
	 * @param {string} timestamp timestamp string of the message
	 * @returns {string} formatted timestamp string
	 */
	const getFormattedTimestamp = (timestamp) => {
		const dateTime = new Date(parseInt(timestamp))

		const formattedTimestamp = `${dateTime.getDate()}-${dateTime.getMonth() + 1}-${dateTime.getFullYear()}`

		if (dateTime.getHours() > 12)
			return formattedTimestamp + ` ${(dateTime.getHours() - 12).toLocaleString("en", { minimumIntegerDigits: 2 })}:${dateTime.getMinutes().toLocaleString("en", { minimumIntegerDigits: 2 })} PM`
		else
			return formattedTimestamp + ` ${dateTime.getHours().toLocaleString("en", { minimumIntegerDigits: 2 })}:${dateTime.getMinutes().toLocaleString("en", { minimumIntegerDigits: 2 })} AM`
	}

	return (
		<MessageFooterWrapper>
			<TimeStamp>{getFormattedTimestamp(props.timestamp)}</TimeStamp>
		</MessageFooterWrapper>
	)
}