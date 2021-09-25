import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Sidebar from "components/AppPage/Sidebar"
import Mainbar from "components/AppPage/Mainbar"
import CustomDrawer from "components/Common/CustomDrawer"
import { getMyProfile } from "services/api-services/user-service"
import { getMyConversations } from "services/api-services/conversation-service"
import { initSocketService } from "services/socket-services"
import { AppPageWrapper, SidebarContainer, MainbarContainer, MainbarPlaceholder } from "./styled"
import { getAuth } from "firebase/auth"

/**
 * This page contains the main app
 * this page is responsible for all chat handling and interactions
 */
export default function AppPage() {

    const { activeConversationID } = useSelector(state => state.conversationReducer)
    const { isMobileScreen } = useSelector(state => state.appReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        getMyProfile()
        getMyConversations()
        initSocketService()
        // Refresh the token asynchronously
        getAuth().onAuthStateChanged(user => {
            user.getIdToken()
        })
    }, [])

    return (
        <AppPageWrapper>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            {!isMobileScreen ? (
                <MainbarContainer>
                    {activeConversationID !== "" ? (
                        <Mainbar />
                    ) : (
                        <MainbarPlaceholder>
                            <h1>WhatsApp Clone</h1>
                        </MainbarPlaceholder>
                    )}
                </MainbarContainer>
            ) : (
                <CustomDrawer open={activeConversationID !== ""} onClose={() => dispatch({ type: "set-active-conversation-id", activeConversationID: "" })}>
                    <Mainbar />
                </CustomDrawer>
            )}
        </AppPageWrapper>
    )
}