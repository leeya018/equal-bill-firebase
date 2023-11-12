import AddGroupModal from "components/modal/group/add";
import EditGroupModal from "components/modal/group/edit";
import { GroupsStore } from "mobx/groupsStore";
import { ModalStore } from "mobx/modalStore";
import * as React from "react";

import { BiBell } from "react-icons/bi";
import { modals } from "util";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const Groups = observer(({}) => {
  const { getMyGroups, myGroups, setChosenGroup } = GroupsStore;

  return (
    <div
      className="mx-6 py-5 flex justify-start gap-4 items-center
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
  );
});

export default Groups;

const AddGroup = observer(({}) => {
  return (
    <div
      className={`p-7 flex flex-col items-center justify-center border-2 border-gray
      rounded-xl gap-1 cursor-pointer`}
      onClick={() => ModalStore.openModal(modals.add_group)}
    >
      <BiBell
        size={20}
        color="black"
        className="border-2 rounded-full bg-white mb-2"
      />
      <div className="">Add Group</div>
    </div>
  );
});

const Group = observer(({ group, className }) => {
  const onClickGroup = () => {
    console.log("onClickGroup", toJS(group));
    GroupsStore.setChosenGroup(group);
    ModalStore.openModal(modals.edit_group);
  };
  return (
    <div
      className={`p-3 flex flex-col border-2 border-gray
      rounded-xl gap-1 cursor-pointer ${className}`}
      onClick={onClickGroup}
    >
      <BiBell
        size={20}
        color="black"
        className="border-2 rounded-full bg-white mb-2"
      />
      <div className="text-lg font-semibold">{group.name}</div>
      <div className="text-gray text-sm">Category</div>
    </div>
  );
});
