import { useRef, useState } from "react"
import Dialog from "@material-ui/core/Dialog"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { FileUploadDialogWrapper, DialogTitle, DialogForm, DialogButton, ProgressCounter, ProgressBar } from "./styled"

/**
 * Component to accept a file input, upload it to firebase and return access url
 */
export default function FileUploadDialog(props) {
    const fileInputRef = useRef()
    const [progress, setProgress] = useState(0)
    const uploadTaskRef = useRef(null)

    const uploadButtonClicked = () => {
        fileInputRef.current.click()
        const storage = getStorage()
        if (fileInputRef.current) {
            fileInputRef.current.onchange = () => {
                if (fileInputRef.current.files.length > 0) {
                    const file = fileInputRef.current.files[0]
                    const fileRef = ref(storage, `${props.folderName}/${Date.now().toString()}-${file.name}`)
                    const uploadTask = uploadBytesResumable(fileRef, file)
                    uploadTaskRef.current = uploadTask
                    uploadTask.on("state_changed", (snapshot) => {
                        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    })
                    uploadTask.then((result) => {
                        getDownloadURL(result.ref).then(downloadURL => {
                            props.onComplete(downloadURL)
                            setProgress(0)
                        })
                    })
                }
            }
        }
    }

    const onCancelClicked = () => {
        if (uploadTaskRef.current)
            uploadTaskRef.current.cancel()
        setProgress(0)
        props.onClose()
    }

    return (
        <Dialog open={props.open}>
            <FileUploadDialogWrapper>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogForm>
                    <DialogButton onClick={onCancelClicked} variant="outlined">Cancel</DialogButton>
                    <DialogButton onClick={uploadButtonClicked} variant="contained">Upload</DialogButton>
                    {progress > 0 ? (
                        <ProgressCounter>{Math.ceil(progress)}%</ProgressCounter>
                    ) : null}
                    <input ref={fileInputRef} hidden type="file" />
                </DialogForm>
                <ProgressBar variant="determinate" value={progress} />
            </FileUploadDialogWrapper>
        </Dialog>
    )
}