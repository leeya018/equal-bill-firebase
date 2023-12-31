import { useEffect, useState } from "react";
import { useRef } from "react";

import { ModalStore } from "mobx/modalStore";
import { observer } from "mobx-react-lite";

import { createGroupApi } from "api";
import { MessageStore } from "mobx/messageStore";
import Alerts from "components/Alerts";
import ApproveButton from "ui/button/modal/approve";
import CloseButton from "ui/button/modal/close";
import Input from "ui/input";
import { modals } from "@/util";
import { GroupsStore } from "mobx/groupsStore";

const AddExpenseModal = observer(() => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { modalName, openModal, closeModal } = ModalStore;

  const inputRef = useRef();

  useEffect(() => {
    // inputRef.current.focus();
  }, []);
  if (!GroupsStore.chosenGroup) return null;

  return (
    <div
      className={`absolute h-screen top-0 left-0 
     right-0 bottom-0 bg-black shadow-md  
     flex justify-center items-center z-10 bg-opacity-70 ${
       modalName === modals.add_expense ? "visible" : "invisible"
     }`}
    >
      <div className="relative bg-white flex flex-col items-center justify-between w-[80vh] h-[80vh] border-2 border-[#e2e2e2]">
        <div className="w-full flex justify-between items-center px-4 py-3 bg-[#F2F2F2] mx-10">
          <div className="font-bold text-xl ">Add Expense</div>
          <CloseButton onClick={closeModal}>Close</CloseButton>
        </div>
        <div className="flex flex-col  gap-3  w-full px-10">
          <div className="text-lg font-bold">
            Group Name: {GroupsStore.chosenGroup.name}
          </div>
          <Input
            inputRef={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Add name"
          />
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Add amount"
          />
          <Alerts />
        </div>
        <div className="w-full flex justify-center items-center py-4 bg-[#F2F2F2] ">
          <ApproveButton
            onClick={() => {
              const { id } = GroupsStore.chosenGroup;
              GroupsStore.addExpense({
                groupId: id,
                name,
                amount,
                date: new Date(),
              });
            }}
            isLoading={false}
          >
            Add expense
          </ApproveButton>
        </div>
      </div>
    </div>
  );
});

export default AddExpenseModal;
