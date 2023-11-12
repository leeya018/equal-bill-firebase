import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { signupApi } from "api";
import { messageStore } from "mobx/messageStore";
import Alerts from "components/Alerts";

export default function signup() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setSuccess, setError } = messageStore;
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const signup = async () => {
    setIsLoading(true);
    const data = await signupApi({
      email,
      name,
      password,
      phone,
    });

    console.log(data);
    if (data.isSuccess) {
      setSuccess(data.message);
      router.push("/signin");
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  };

  return (
    <div
      className="w-full  h-[100vh] flex  items-center justify-center 
   overflow-hidden bg-[#F3F3F7]"
    >
      <div className="w-[80%] h-[80vh]  bg-white flex items-center justify-between rounded-xl shadow-xl p-3">
        <div className="flex flex-col items-center justify-between h-full ">
          {/* title */}
          <div className="text-lg font-bold text-left w-full p-2">
            Equal Bill
          </div>
          {/* signin */}
          <div className="w-[80%]">
            <div className="text-4xl font-bold mb-2">Sign up</div>
            <div className="mb-10 font-semibold">
              Fill your name, email and password{" "}
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Full Name"
              className="mb-2 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2 w-full focus:border-custom-blue"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone"
              className="mb-2 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2 w-full focus:border-custom-blue"
            />
            <input
              ref={inputRef}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="mb-2 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2 w-full focus:border-custom-blue"
            />

            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type Password"
              className="mb-4 border-2 border-[#4B6DCF] text-semibold rounded-md h-9 pl-2  w-full focus:border-[#4B6DCF]"
            />
            <button
              onClick={signup}
              disabled={isLoading}
              className={`${
                isLoading ? "bg-gray" : "bg-[#4B6DCF]"
              } mb-2  border-2  rounded-xl w-full py-2 text-white font-semibold flex justify-center items-center`}
            >
              Sign up
            </button>
            <Alerts />
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
        <div className="bg-equal_bill h-full w-[60%] rounded-xl shadow-lg flex items-center justify-center"></div>
      </div>
    </div>
  );
}
