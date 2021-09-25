import { MessageContentWrapper, Image, Video } from "./styled"

/**
 * Message Content
 */
export default function MessageContent(props) {

	const Content = (props) => {
		switch(props.contentType) {
			case "LINK":
				return <a target="blank" href={props.content}>{props.content}</a>
			case "VIDEO":
				return <Video playsInline controls src={props.content}></Video>
			case "AUDIO":
				return <audio controls src={props.content}></audio>
			case "IMAGE":
				return <Image src={props.content} alt="message content" />
			default:
				return <p>{props.content}</p>
		}
	}

	return (
		<MessageContentWrapper>
			<Content contentType={props.contentType} content={props.content} />
		</MessageContentWrapper>
	)
}