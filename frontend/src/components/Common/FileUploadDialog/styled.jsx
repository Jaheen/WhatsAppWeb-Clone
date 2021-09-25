import styled from "styled-components"
import LinearProgress from "@material-ui/core/LinearProgress"
import Button from "@material-ui/core/Button"

export const FileUploadDialogWrapper = styled.section`
    padding: 1em;
    min-width: 30vw;
    @media(max-width: 576px) {
        width: max-content;
    }
`
export const DialogTitle = styled.h3`
    font-weight: normal;
`
export const DialogForm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1em;
    & > * {
        margin: 0 10px;
    }
`
export const DialogButton = styled(Button)`
    background-color: ${props => props.variant === "contained" ? "#00BFA5 !important" : "initial"};
    color: ${props => props.variant === "contained" ? "white" : "#00BFA5"} !important;
    border-color: ${props => props.variant === "outlined" ? "#00BFA5" : "initial"} !important;
    margin: 1em !important;
`
export const ProgressCounter = styled.p`
    color: #00BFA5;
    font-size: 20px
`
export const ProgressBar = styled(LinearProgress)`
    background-color: #c5fff6 !important;
    .MuiLinearProgress-barColorPrimary {
        background-color: #00BFA5;
    }
`
