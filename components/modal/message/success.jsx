import { useEffect, useState } from "react";
import { useRef } from "react";

import { modalStore } from "mobx/modalStore";
import { observer } from "mobx-react-lite";

import { messageStore } from "mobx/messageStore";

import { modals } from "@/util";

import SuccessButton from "ui/button/modal/success";

const SuccessModal = observer(() => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setSuccess, success, setError } = messageStore;

  const { modalName, closeModal } = modalStore;

  return (
    <div
      className={`absolute h-screen top-0 left-0 
     right-0 bottom-0 bg-black shadow-md  
     flex justify-center items-center z-10 bg-opacity-70 ${
       modalName === modals.success_message ? "visible" : "invisible"
     } `}
    >
      <div
        className={`relative bg-white flex flex-col items-center
       justify-between w-[50vh] h-[30vh] border-2 border-[#e2e2e2]`}
      >
        <div className="w-full flex justify-between items-center px-4 py-3 bg-[#F2F2F2] mx-10">
          <div className="font-bold text-xl ">Message</div>
        </div>
        <div className="flex flex-col  gap-3  w-full px-10">
          <div className="text-xl font-bold  text-[#35d08c]">{success}</div>
        </div>
        <div className="w-full flex justify-center items-center gap-5 py-4 bg-[#F2F2F2] ">
          <SuccessButton onClick={() => closeModal()}>Done</SuccessButton>
        </div>
      </div>
    </div>
  );
});

export default SuccessModal;
