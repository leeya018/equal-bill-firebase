import { useEffect, useState } from "react";
import { useRef } from "react";

import { modalStore } from "mobx/modalStore";
import { observer } from "mobx-react-lite";

import { createGroupApi, deleteGroupApi, updateGroupNameApi } from "api";
import { messageStore } from "mobx/messageStore";
import Alerts from "components/Alerts";
import ApproveButton from "ui/button/modal/approve";
import CloseButton from "ui/button/modal/close";
import Input from "ui/input";
import { modals } from "@/util";
import { GroupsStore } from "mobx/groupsStore";
import { toJS } from "mobx";

const EditGroupModal = observer(() => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setSuccess, setError } = messageStore;

  const { modalName, closeModal, openModal } = modalStore;
  const { getMyGroups, chosenGroup, setChosenGroup } = GroupsStore;

  const inputRef = useRef();

  useEffect(() => {
    // inputRef.current.focus();
  }, []);

  useEffect(() => {
    setName(chosenGroup?.name);
  }, [chosenGroup?.name]);

  const updateGroupName = async () => {
    console.log("chosenGroup", toJS(chosenGroup));
    const data = await GroupsStore.updateGroupName({
      groupId: chosenGroup.id,
      groupName: name,
    });
    console.log(data);
    if (data.isSuccess) {
      setSuccess(data.message);
      openModal(modals.success_message);
    } else {
      setError(data.message);
    }
    console.log(data);
    setIsLoading(false);
  };
  const deleteGroup = async () => {
    const data = await deleteGroupApi(chosenGroup.id);
    console.log(data);
    if (data.isSuccess) {
      setSuccess(data.message);
      openModal(modals.success_message);

      setChosenGroup(null);
    } else {
      setError(data.message);
    }
    console.log(data);
    setIsLoading(false);
  };

  return (
    <div
      className={`absolute h-screen top-0 left-0 
     right-0 bottom-0 bg-black shadow-md  
     flex justify-center items-center z-10 bg-opacity-70 ${
       modalName === modals.edit_group ? "visible" : "invisible"
     }`}
    >
      <div className="relative bg-white flex flex-col items-center justify-between w-[80vh] h-[80vh] border-2 border-[#e2e2e2]">
        <div className="w-full flex justify-between items-center px-4 py-3 bg-[#F2F2F2] mx-10">
          <div className="font-bold text-xl ">Edit Group</div>
          <CloseButton onClick={closeModal}>Close</CloseButton>
        </div>
        <div className="flex flex-col  gap-3  w-full px-10">
          <div className="text-lg font-bold">Group Name:</div>
          <Input
            inputRef={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Search"
          />
          <Alerts />
        </div>
        <div className="w-full flex justify-center items-center gap-5 py-4 bg-[#F2F2F2] ">
          <ApproveButton onClick={updateGroupName} isLoading={isLoading}>
            Update Group
          </ApproveButton>
          <ApproveButton onClick={deleteGroup} isLoading={isLoading}>
            Delete Group
          </ApproveButton>
        </div>
      </div>
    </div>
  );
});

export default EditGroupModal;
