import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { useState, useRef, useEffect } from "react"
import Loader from "components/Common/Loader"
import Button from "@material-ui/core/Button"
import Logo from "assets/images/logo.svg"
import { IndexPageWrapper, MainContainer, Header, HeaderBranding, FormContainer, Form, FormSlide, FormSlideInput } from "./styled"
import { addUser } from "services/api-services/user-service"
import { useHistory } from "react-router-dom"

/**
 * This is the index page corresponding to url /
 * this page contains the login form
 */
export default function IndexPage() {

    // Refs states and vars
    const formRef = useRef(null)
    const phoneInputRef = useRef(null)
    const otpInputRef = useRef(null)
    const auth = getAuth()
    const [isLoaderOpen, toggleLoader] = useState(false)
    const history = useHistory()

    const onSendOTPClicked = () => {
        if (phoneInputRef.current.value.trim() === "")
            alert("Please enter a valid phone number")
        else {
            toggleLoader(true)
            signInWithPhoneNumber(auth, phoneInputRef.current.value, window.recaptchaVerifier)
                .then(confirmationResult => {
                    toggleLoader(false)
                    window.confirmationResult = confirmationResult
                    formRef.current.scroll({ left: formRef.current.offsetWidth, behavior: "smooth" })
                }).catch(console.log)
        }
    }

    const onCancelClicked = () => {
        phoneInputRef.current.value = ""
        otpInputRef.current.value = ""
        formRef.current.scroll({ left: -formRef.current.offsetWidth, behavior: "smooth" })
    }

    const onVerifyOTPClicked = () => {
        if (otpInputRef.current.value.trim() === "")
            alert("Please enter a valid OTP")
        else {
            toggleLoader(true)
            window.confirmationResult.confirm(otpInputRef.current.value).then(credential => {
                credential.user.getIdToken().then(token => {
                    addUser(token, phoneInputRef.current.value)
                        .then(serverAuthToken => {
                            window.localStorage.setItem("server-auth-token", serverAuthToken)
                            history.push("/app")
                        })
                }).catch(console.log)
            }).catch(console.log)
        }
    }

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", { "size": "invisible" }, auth)
    }, [auth])

    return (
        <IndexPageWrapper>
            <MainContainer>
                <Header>
                    <HeaderBranding>
                        <img src={Logo} alt="logo" />
                        <p>WHATSAPP CLONE</p>
                    </HeaderBranding>
                </Header>
                <FormContainer>
                    <Form ref={formRef}>
                        <FormSlide>
                            <FormSlideInput ref={phoneInputRef} type="text" placeholder="Enter mobile number" />
                            <Button onClick={onSendOTPClicked} variant="contained" color="primary">Send OTP</Button>
                        </FormSlide>
                        <FormSlide>
                            <FormSlideInput ref={otpInputRef} type="text" placeholder="Enter OTP" />
                            <div>
                                <Button onClick={onCancelClicked} variant="outlined" color="primary">Cancel</Button>
                                <Button onClick={onVerifyOTPClicked} variant="contained" color="primary">Verify OTP</Button>
                            </div>
                        </FormSlide>
                    </Form>
                </FormContainer>
            </MainContainer>
            <Loader open={isLoaderOpen} loaderText="Please Wait..." />
            <div id="recaptcha-container"></div>
        </IndexPageWrapper>
    )
}