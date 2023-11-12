import { useEffect, useState } from "react";
import { useRef } from "react";

import { modalStore } from "mobx/modalStore";
import { observer } from "mobx-react-lite";

import { modals } from "../util";
import { createGroupApi } from "api";
import { messageStore } from "mobx/messageStore";
import Alerts from "./Alerts";

const AddModal = observer(() => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setSuccess, setError } = messageStore;

  const { modalName, closeModal } = modalStore;

  const inputRef = useRef();

  useEffect(() => {
    // inputRef.current.focus();
  }, []);

  const createGroup = async () => {
    setIsLoading(true);
    const data = await createGroupApi(name);
    if (data.isSuccess) {
      setSuccess(data.message);
      closeModal();
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`absolute h-screen top-0 left-0 
     right-0 bottom-0 bg-black shadow-md  
     flex justify-center items-center z-10 bg-opacity-70 ${"visible"}`}
      //    modalName === modals.add_group ? "visible" : "invisible"
    >
      <div className="relative bg-white flex flex-col items-center justify-between w-[80vh] h-[80vh] border-2 border-[#e2e2e2]">
        <div className="w-full flex justify-between items-center px-4 py-3 bg-[#F2F2F2] mx-10">
          <div className="font-bold text-xl ">Add Group</div>
          <button
            onClick={closeModal}
            disabled={isLoading}
            className={`bg-white   border-2 border-[#e2e2e2] font-bold 
            rounded-md py-2 px-4 text-black
           flex justify-center items-center`}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col  gap-3  w-full px-10">
          <div className="text-lg font-bold">Group Name:</div>
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Search"
            className="pl-5 h-10  w-full border-2 border-[#e2e2e2]"
          />
          <Alerts />
        </div>
        <div className="w-full flex justify-center items-center py-4 bg-[#F2F2F2] ">
          <button
            onClick={createGroup}
            disabled={isLoading}
            className={`${
              isLoading ? "bg-gray" : "bg-[#35d08c] border-[#e2e2e2]"
            } mb-2  border-2  rounded-md  py-2 px-4 text-white 
            font-semibold flex justify-center items-center`}
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
});

export default AddModal;
