import { useEffect, useState } from "react";
import { useRef } from "react";

import { ModalStore } from "mobx/modalStore";
import { observer } from "mobx-react-lite";

import { createGroupApi, deleteGroupApi, updateGroupNameApi } from "api";
import { MessageStore } from "mobx/messageStore";
import Alerts from "components/Alerts";
import ApproveButton from "ui/button/modal/approve";
import CloseButton from "ui/button/modal/close";
import Input from "ui/input";
import { modals } from "@/util";
import { GroupsStore } from "mobx/groupsStore";
import { toJS } from "mobx";
import Users from "components/left/Users";
import Expense from "components/right/Expense";

const EditUserModal = observer(() => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setSuccess, setError } = MessageStore;

  const { modalName, closeModal, openModal } = ModalStore;
  const { getMyGroups, chosenGroup, setChosenGroup } = GroupsStore;

  const inputRef = useRef();

  const getUserExpenses = () => {
    console.log("getUserExpenses", toJS(GroupsStore.chosenGroup));

    if (!GroupsStore.chosenGroup) return [];
    const expenses = GroupsStore.chosenGroup.expenses.filter(
      (expense) => expense.user_id === GroupsStore.chosenUser?.id
    );
    return expenses;
  };

  return (
    <div
      className={`absolute h-screen top-0 left-0 
     right-0 bottom-0 bg-black shadow-md  
     flex justify-center items-center z-10 bg-opacity-70 ${
       modalName === modals.edit_user ? "visible" : "invisible"
     }`}
    >
      <div className="relative bg-white flex flex-col items-center  w-[80vh] h-[80vh] border-2 border-[#e2e2e2]">
        <div className="w-full flex justify-between items-center px-4 py-3 bg-[#F2F2F2] mx-10">
          <div className="font-bold text-xl ">Edit User</div>
          <CloseButton onClick={closeModal}>Close</CloseButton>
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <div className="text-lg font-bold">
            Name: {GroupsStore?.chosenUser?.name}
          </div>
          <div className="text-lg font-bold">
            Phone: {GroupsStore?.chosenUser?.phone}
          </div>
          <div className="font-semibold text-lg underline">Expenses:</div>
          <ul className=" h-[22rem] overflow-y-auto">
            {getUserExpenses().map((expense, key) => (
              <Expense key={key} expense={expense} />
            ))}
          </ul>
        </div>
        <div className="absolute bottom-0 w-full flex justify-center items-center gap-5 py-4 bg-[#F2F2F2] ">
          <ApproveButton
            onClick={() => ModalStore.openModal(modals.remove_user)}
            isLoading={isLoading}
          >
            Delete User
          </ApproveButton>
        </div>
      </div>
    </div>
  );
});

export default EditUserModal;
// onClick={() => GroupsStore.removeUser(GroupsStore?.chosenUser?.id)}
