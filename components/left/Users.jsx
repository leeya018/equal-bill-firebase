import AddGroupModal from "components/modal/group/add";
import EditGroupModal from "components/modal/group/edit";

import { ModalStore } from "mobx/modalStore";
import * as React from "react";

import { BiBell, BiEditAlt } from "react-icons/bi";
import { modals } from "util";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { GroupsStore } from "mobx/groupsStore";
import { useState } from "react";
import EditUserModal from "components/modal/user/edit";
import RemoveUserModal from "components/modal/user/remove";

const Users = observer(({ canBeEdit = false }) => {
  return (
    <div className="mx-6 py-5 flex flex-col">
      <EditUserModal />
      <RemoveUserModal />
      <div className="  mb-2  underline font-semibold">Users</div>
      <div
        className="flex justify-start items-center gap-4 
    "
      >
        <>
          {GroupsStore.users
            ?.map((user, key) => (
              <User
                key={key}
                className="bg-[#FFFBEF]"
                user={user}
                canBeEdit={canBeEdit}
              />
            ))
            .reverse()}
        </>
      </div>
    </div>
  );
});

export default Users;

const User = observer(({ user, className, canBeEdit = false }) => {
  return (
    <div
      className={`px-3 py-3 flex flex-col border-2 border-gray w-32 h-28  
      rounded-3xl gap-1 cursor-pointer ${className} ${
        GroupsStore?.chosenGroup?.id === user.id && "border-[#7987B4]"
      }`}
      onClick={() => {
        if (GroupsStore.chosenUser?.id === user.id) {
          GroupsStore.setChosenUser(null);
        } else {
          GroupsStore.setChosenUser(user);
        }
      }}
    >
      <div className="flex justify-between items-center">
        <BiBell
          size={20}
          color="black"
          className="border-2 rounded-full bg-white mb-2"
        />
        {canBeEdit && (
          <BiEditAlt
            onClick={(e) => {
              e.stopPropagation();
              GroupsStore.setChosenUser(user);

              ModalStore.openModal(modals.edit_user);
            }}
            size={20}
            color="black"
            className=" bg-white mb-2"
          />
        )}
      </div>
      <div className="text-lg font-semibold">
        {user.name.length > 10 ? user.name.slice(0, 10) + "..." : user.name}
      </div>
      <div className="text-gray text-sm">Category</div>
    </div>
  );
});
