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

const RemoveUserModal = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const { setSuccess, setError } = MessageStore;

  const { modalName, closeModal, openModal } = ModalStore;

  const inputRef = useRef();
  const groupId = GroupsStore.chosenGroup?.id;
  const userId = GroupsStore.chosenUser?.id;

  return (
    <div
      className={`absolute h-screen top-0 left-0 
     right-0 bottom-0 bg-black shadow-md  
     flex justify-center items-center z-10 bg-opacity-70 ${
       modalName === modals.remove_user ? "visible" : "invisible"
     }`}
    >
      <div className="relative bg-white flex flex-col items-center  w-[80vh] h-[80vh] border-2 border-[#e2e2e2]">
        <div className="w-full flex justify-between items-center px-4 py-3 bg-[#F2F2F2] mx-10">
          <div className="font-bold text-xl ">Remove User</div>
          <CloseButton onClick={closeModal}>Close</CloseButton>
        </div>

        <div className="flex flex-col gap-4 mt-10 text-lg font-bold">
          Are you sure that you want to delete : {GroupsStore?.chosenUser?.name}
        </div>

        <div className="absolute bottom-0 w-full flex justify-center items-center gap-5 py-4 bg-[#F2F2F2] ">
          <ApproveButton
            onClick={() => {
              GroupsStore.removeUserToGroup({ groupId, userId });
              ModalStore.openModal(modals.edit_group);
            }}
            isLoading={isLoading}
          >
            Remove User
          </ApproveButton>
          <ApproveButton
            onClick={() => ModalStore.openModal(modals.edit_group)}
            isLoading={isLoading}
          >
            Cancel
          </ApproveButton>
        </div>
      </div>
    </div>
  );
});

export default RemoveUserModal;
//
