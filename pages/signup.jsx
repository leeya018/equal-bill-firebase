import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { auth } from "../firebase"
import { signupApi } from "api"
import { MessageStore } from "mobx/messageStore"
import Alerts from "components/Alerts"
import { observer } from "mobx-react-lite"
import SignInput from "ui/input/sign"
import SignButton from "ui/button/modal/sign"
import { ModalStore } from "mobx/modalStore"
import { modals } from "@/util"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import Image from "next/image"
import EmailAndPassModal from "components/modal/login/emailAndPass"

const signup = observer(({}) => {
  const router = useRouter()
  const inputRef = useRef(null)

  const { setSuccess, setError } = MessageStore
  useEffect(() => {
    // inputRef.current.focus();
  }, [])

  const googleSignin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const someToken = credential.accessToken
        // console.log(token)

        // The signed-in user info.
        const user = result.user
        console.log(user)

        console.log(user.photoURL)
        console.log(user.displayName)
        console.log(user.uid)

        // debtStore.addUser(user.uid, user.displayName)
        router.push("/")
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        // const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  return (
    <div
      className="w-full  h-[100vh] flex  items-center justify-center 
   overflow-hidden bg-[#F3F3F7]"
    >
      <EmailAndPassModal />

      <div
        className="w-[80%] h-[80vh]  bg-white flex items-center 
      justify-between rounded-xl shadow-xl p-3"
      >
        <div className="flex flex-col justify-between  h-full flex-1">
          {/* title */}
          <div className="text-lg font-bold text-left w-full p-2">
            Equal Bill
          </div>
          {/* signup */}
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center gap-4 w-1/2">
              <SignButton
                onClick={() => ModalStore.openModal(modals.phone)}
                className="bg-[#4B6DCF] mb-2"
              >
                phone
              </SignButton>
              <SignButton
                className={`bg-[#4B6DCF] mb-2 `}
                onClick={() => ModalStore.openModal(modals.email_and_pass)}
              >
                Email and password
              </SignButton>
              <button
                onClick={googleSignin}
                className="bg-[##4284F3]
            mb-2  border-2 border-black  rounded-xl
            w-full py-2 text-white
            font-semibold flex justify-center items-center gap-2"
              >
                <Image
                  alt="google image"
                  width={32}
                  height={32}
                  className="rounded-lg "
                  src={"/google.png"}
                />
                <div className="text-black">Sign in with Google</div>
              </button>
            </div>
          </div>
          {/* end */}
          <div className="flex flex-col items-center text-sm ">
            <div className="text-gray_dark">Already have an account? </div>
            <div
              className="text-[#4B6DCF] underline cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              Sign in{" "}
            </div>
          </div>
        </div>
        <div className="bg-equal_bill h-full w-[60%] rounded-xl shadow-lg flex items-center justify-center">
          <div className="text-white font-bold rotate-45">Equal bill1</div>
        </div>
      </div>
    </div>
  )
})
export default signup
