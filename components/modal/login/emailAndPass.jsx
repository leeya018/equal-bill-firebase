import { useEffect, useState } from "react"
import { useRef } from "react"

import { ModalStore } from "mobx/modalStore"
import { observer } from "mobx-react-lite"

import { createGroupApi, signupApi } from "api"
import { MessageStore } from "mobx/messageStore"
import Alerts from "components/Alerts"
import ApproveButton from "ui/button/modal/approve"
import CloseButton from "ui/button/modal/close"
import Input from "ui/input"
import { modals } from "@/util"
import { GroupsStore } from "mobx/groupsStore"
import SignInput from "ui/input/sign"
import { useRouter } from "next/router"
import SignButton from "ui/button/modal/sign"

const EmailAndPassModal = observer(() => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")

  const [name, setName] = useState("")

  const { modalName, openModal, closeModal } = ModalStore
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const inputRef = useRef()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  const signupFunc = async () => {
    setIsLoading(true)
    const data = await signupApi({
      email,
      name,
      password,
      phone,
    })

    console.log(data)
    if (data.isSuccess) {
      MessageStore.setSuccess(data.message)
      router.push("/signin")
    } else {
      MessageStore.setError(data.message)
    }
    setIsLoading(false)
  }

  return (
    <div
      className={`absolute h-screen top-0 left-0 
     right-0 bottom-0 bg-black shadow-md  
     flex justify-center items-center z-10 bg-opacity-70 ${
       modalName === modals.email_and_pass ? "visible" : "invisible"
     }`}
    >
      <div className="relative bg-white flex flex-col items-center justify-between w-[80vh] h-[80vh] border-2 border-[#e2e2e2]">
        <div className="w-[80%]">
          <div className="text-4xl font-bold mb-2">Sign up</div>
          <div className="mb-10 font-semibold">
            Fill your name, email and password{" "}
          </div>
          <SignInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Full Name"
            className="mb-2"
          />
          <SignInput
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone"
            className="mb-2"
          />
          <SignInput
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="mb-2"
          />

          <SignInput
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type Password"
            className="mb-4 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2  w-full focus:border-[#4B6DCF]"
          />
          <SignButton
            onClick={signupFunc}
            disabled={isLoading}
            className={`${isLoading ? "bg-gray" : "bg-[#4B6DCF]"} mb-2  `}
          >
            Sign up
          </SignButton>
          <Alerts />
        </div>
      </div>
    </div>
  )
})

export default EmailAndPassModal
