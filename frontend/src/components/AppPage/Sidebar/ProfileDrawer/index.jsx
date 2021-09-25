import { useState } from "react"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera"
import { useSelector, useDispatch } from "react-redux"
import CustomDrawer from "components/Common/CustomDrawer"
import FileUploadDialog from "components/Common/FileUploadDialog"
import EditableField from "./EditableField"
import { updateUsername, updateDescription, updateProfilePicURL } from "services/api-services/user-service"
import { DrawerHeader, ProfilePicContainer, ProfilePic, ProfilePicOverlay, ProfilePicOverlayContent, FieldContainer, FieldTitle } from "./styled"

export default function ProfileDrawer() {
	
	const { isProfileDrawerOpen } = useSelector(state => state.appReducer)
	const { profilePicURL, username, description } = useSelector(state => state.userReducer)
	const dispatch = useDispatch()
	const [fileUploadDialogOpen, toggleFileUploadDialog] = useState(false)

	const onProfilePicUpdated = (downloadURL) => {
		updateProfilePicURL(downloadURL)
		dispatch({ type: "update-profile-pic", profilePicURL: downloadURL })
		toggleFileUploadDialog(false)
	}

	return (
		<CustomDrawer open={isProfileDrawerOpen} onClose={() => dispatch({ type: "toggle-profile-drawer" })}>
			<DrawerHeader>
				<IconButton size="small" onClick={() => dispatch({ type: "toggle-profile-drawer" })}>
					<ArrowBackIcon />
				</IconButton>
				<h4>Profile</h4>
			</DrawerHeader>

			<ProfilePicContainer>
				<ProfilePic src={profilePicURL} alt="myDP" />
				<ProfilePicOverlay onClick={() => toggleFileUploadDialog(true)} className="overlay">
					<ProfilePicOverlayContent>
						<PhotoCameraIcon />
						<small>Update Profile Picture</small>
					</ProfilePicOverlayContent>
				</ProfilePicOverlay>

				<FileUploadDialog 
					folderName="profile-pictures" 
					open={fileUploadDialogOpen} 
					onClose={() => toggleFileUploadDialog(false)} 
					onComplete={onProfilePicUpdated}
					title="Update Profile Photo" />
			</ProfilePicContainer>

			<FieldContainer>
				<FieldTitle>Your Name</FieldTitle>
				<EditableField defaultValue={username} onEditDone={updateUsername} />
			</FieldContainer>

			<FieldContainer>
				<FieldTitle>Description</FieldTitle>
				<EditableField defaultValue={description} onEditDone={updateDescription} />
			</FieldContainer>
		</CustomDrawer>
	)
}