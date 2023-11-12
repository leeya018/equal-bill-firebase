import AddGroupModal from "components/modal/group/add";
import EditGroupModal from "components/modal/group/edit";
import { GroupsStore } from "mobx/groupsStore";
import { modalStore } from "mobx/modalStore";
import * as React from "react";

import { BiBell } from "react-icons/bi";
import { modals } from "util";

export default function Groups() {
  const { getMyGroups, myGroups } = GroupsStore;

  return (
    <div
      className="mx-6 py-5 flex justify-start gap-4 items-center
  "
    >
      <EditGroupModal groupName={"trstrs"} groupId={"yQ25DtzvCMHf9EKpd9qd"} />
      <AddGroupModal />
      <AddGroup />
      <>
        {myGroups.map((group, key) => (
          <Group key={key} className="bg-[#FFFBEF]" group={group} />
        ))}
      </>
    </div>
  );
}

function AddGroup({}) {
  return (
    <div
      className={`p-7 flex flex-col items-center justify-center border-2 border-gray
      rounded-xl gap-1 cursor-pointer`}
      onClick={() => modalStore.openModal(modals.add_group)}
    >
      <BiBell
        size={20}
        color="black"
        className="border-2 rounded-full bg-white mb-2"
      />
      <div className="">Add Group</div>
    </div>
  );
}
function Group({ className, group }) {
  return (
    <div
      className={`p-3 flex flex-col border-2 border-gray
      rounded-xl gap-1 cursor-pointer ${className}`}
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
}
