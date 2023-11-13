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

const Users = observer(({}) => {
  const [chosenUser, setChosenUser] = useState(null);

  return (
    <div
      className="mx-6 py-5 flex justify-start gap-4 items-center
  "
    >
      {/* <EditGroupModal />
      <AddGroupModal /> */}

      <>
        {GroupsStore.users
          ?.map((user, key) => (
            <User
              key={key}
              className="bg-[#FFFBEF]"
              user={user}
              setChosenUser={setChosenUser}
              chosenUser={chosenUser}
            />
          ))
          .reverse()}
      </>
    </div>
  );
});

export default Users;

const User = observer(({ user, className, setChosenUser, chosenUser }) => {
  const onClickGroup = (e) => {
    e.stopPropagation();
    console.log("onClickeUtes", toJS(user));

    // ModalStore.openModal(modals.edit_user);
  };
  return (
    <div
      className={`px-3 py-3 flex flex-col border-2 border-gray w-32 h-28  
      rounded-3xl gap-1 cursor-pointer ${className} ${
        GroupsStore.chosenGroup?.id === user.id && "border-[#7987B4]"
      }`}
      onClick={() => {
        if (chosenUser?.id === user.id) {
          setChosenUser(null);
        } else {
          setChosenUser(user);
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
        {user.name.length > 10 ? user.name.slice(0, 10) + "..." : user.name}
      </div>
      <div className="text-gray text-sm">Category</div>
    </div>
  );
});
