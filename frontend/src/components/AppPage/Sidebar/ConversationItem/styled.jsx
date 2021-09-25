import styled from "styled-components"

export const ConversationWrapper = styled.div`
    display: flex;
    cursor: pointer;
    padding: 5px 0;
    border-bottom: .5px #f4f4f4 solid;
    color: initial;
    &:hover {
        background-color: #F6F6F6;
    }
    &:active {
        background-color: #EDEDED;
    }
`
export const AvatarContainer = styled.div`
    padding: .5em;
`
export const DataContainer = styled.div`
    flex-grow: 1;
    max-width: 65%;
    justify-self: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 5px;
`
export const ChatName = styled.p`
    font-size: 15px;
    white-space: nowrap;
`
export const LastChat = styled.p`
    width: 100%;
    font-size: 12px;
    white-space: nowrap;
    color: grey;
    overflow: hidden;
    text-overflow: ellipsis;
`
export const MetadataContainer = styled.div`
    padding: 0 5px;
    width: 15%;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
export const LastActive = styled.p`
    font-size: 10px;
    color: grey;
    white-space: nowrap;
    margin-bottom: 5px;
`
export const UnreadMessages = styled.div`
    min-width: 20px;
    min-height: 20px;
    padding: 3px 8px;
    background-color: #00ca1b;
    border-radius: 1000px;
    font-size: 10px;
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`
