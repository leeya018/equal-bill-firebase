import React, { useEffect } from "react";
import Left from "components/left";
import Right from "components/right";
import SuccessModal from "components/modal/message/success";
import { GroupsStore } from "mobx/groupsStore";

import { observer } from "mobx-react-lite";

const index = observer(({}) => {
  const { getMyGroups, myGroups } = GroupsStore;
  useEffect(() => {
    getMyGroups();
  }, []);
  return (
    <div className="flex gap-2 w-[100vw]  h-[100vh]">
      <SuccessModal />
      <Left />
      <Right />
    </div>
  );
});

export default index;
