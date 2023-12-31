import AddGroupModal from "components/modal/group/add";
import EditGroupModal from "components/modal/group/edit";
import { GroupsStore } from "mobx/groupsStore";
import { ModalStore } from "mobx/modalStore";
import * as React from "react";

import { BiBell, BiEditAlt } from "react-icons/bi";
import { modals } from "util";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const Groups = observer(({}) => {
  const { getMyGroups, myGroups, setChosenGroup } = GroupsStore;

  return (
    <div className="mx-6 py-5 flex flex-col">
      <div className="  mb-2  underline font-semibold">Groups</div>
      <div
        className="flex justify-start items-center gap-4 
      "
      >
        <EditGroupModal />
        <AddGroupModal />
        <AddGroup />
        <>
          {myGroups
            ?.map((group, key) => (
              <Group key={key} className="bg-[#FFFBEF]" group={group} />
            ))
            .reverse()}
        </>
      </div>
    </div>
  );
});

export default Groups;

const AddGroup = observer(({}) => {
  return (
    <div
      className={` flex flex-col items-center justify-center border-2 border-gray w-32 h-32
      rounded-xl gap-1 cursor-pointer`}
      onClick={() => ModalStore.openModal(modals.add_group)}
    >
      <BiBell
        size={32}
        color="black"
        className="border-2 rounded-full bg-white mb-2"
      />
      <div className="">Add Group</div>
    </div>
  );
});

const Group = observer(({ group, className }) => {
  const onClickGroup = (e) => {
    e.stopPropagation();
    console.log("onClickGroup", toJS(group));
    GroupsStore.setChosenGroup(group);

    ModalStore.openModal(modals.edit_group);
  };
  return (
    <div
      className={`px-3 py-3 flex flex-col border-2 border-gray w-32 h-28  
      rounded-3xl gap-1 cursor-pointer ${className} ${
        GroupsStore.chosenGroup?.id === group.id && "border-[#7987B4]"
      }`}
      onClick={() => {
        if (GroupsStore.chosenGroup?.id === group.id) {
          GroupsStore.setChosenGroup(null);
        } else {
          GroupsStore.setChosenGroup(group);
          console.log(toJS(group));
          GroupsStore.getUsersOfGroup(group.id);
        }
      }}
    >
      <div className="flex justify-between items-center">
        <BiBell
          size={20}
          color="black"
          className="border-2 rounded-full bg-white mb-2"
        />
        <BiEditAlt
          onClick={onClickGroup}
          size={20}
          color="black"
          className=" bg-white mb-2"
        />
      </div>
      <div className="text-lg font-semibold">
        {group.name.length > 10 ? group.name.slice(0, 10) + "..." : group.name}
      </div>
      <div className="text-gray text-sm">Category</div>
    </div>
  );
});
